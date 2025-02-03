'use server';

import {
  findBook,
  getBookByTitleDB,
  saveBooksDB,
} from '@/features/books/db/books';
import { KindleBook } from '@/types/books';
import { getUserBySupabaseId } from '@/utils/user';
import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { saveHighlightsDB } from '../db/export';

interface GoogleBookVolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  publisher?: string;
  language?: string;
  industryIdentifiers?: Array<{
    type: string;
    identifier: string;
  }>;
  pageCount?: number;
  categories?: string[];
  imageLinks?: {
    thumbnail?: string;
  };
  previewLink?: string;
}

interface GoogleBookItem {
  id: string;
  selfLink: string;
  volumeInfo: GoogleBookVolumeInfo;
  searchInfo?: {
    textSnippet?: string;
  };
}

type MarkdownFile = {
  content: string;
  filename: string;
};

interface GoogleBookResponse {
  items?: GoogleBookItem[];
}

export const extractBooksAction = async (
  content: string
): Promise<KindleBook[]> => {
  console.log('extractBooks', content);

  try {
    const clippings = content
      .replace(/\uFEFF/g, '')
      .split('==========')
      .map((clipping) => clipping.trim())
      .filter(Boolean);

    const books: KindleBook[] = [];

    for (const clipping of clippings) {
      const lines = clipping.split('\n').filter(Boolean);
      if (lines.length < 3) continue;

      const [titleLine, infoLine, quote] = lines;
      const title = titleLine.match(/^[^(]+/)?.[0]?.trim();
      const author = titleLine.match(/\(([^)]+)\)$/)?.[1];

      if (!title || !author) continue;

      let book = books.find(
        (book) => book.title.toLowerCase() === title.toLowerCase()
      );

      if (!book) {
        book = {
          id: randomUUID(),
          title,
          author,
          highlights: [],
          selected: false,
        };
        books.push(book);
      }

      book.highlights.push({
        quote: quote.toLowerCase(),
        info: infoLine.toLowerCase(),
      });
    }

    return books;
  } catch (error) {
    console.error('Error extracting books', error);
    throw error;
  }
};

export const exportToMarkdown = async (
  books: KindleBook[]
): Promise<MarkdownFile[]> => {
  const markdownFiles = await Promise.all(
    books.map((book: KindleBook) => {
      const bookMd = `# ${book.title} - ${book.author}\n\n## Highlights\n\n`;
      const highlightsMd = book.highlights
        .map((h) => `- ${h.quote}\n  ${h.info}`)
        .join('\n\n');

      return {
        content: bookMd + highlightsMd,
        filename: `${book.title.toLowerCase().replace(/\s+/g, '-')}.md`,
      };
    })
  );

  return markdownFiles;
};

const fromFileNameToTitle = (filename: string): string => {
  return filename
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .replace(/[éèêë]/g, 'e')
    .replace(/[àâä]/g, 'a')
    .replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ûüù]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[']/g, '')
    .trim();
};

export const getBookIdAndAuthorByTitle = async (
  title: string
): Promise<{
  id: string;
  author: string;
  title: string;
} | null> => {
  try {
    const book = await getBookByTitleDB(title);
    return { id: book.id, author: book.author, title: book.title };
  } catch (error) {
    console.error('Error getting book id and author by title', error);
    return null;
  }
};

export const saveHighlights = async (highlights: MarkdownFile[]) => {
  const user = await getUserBySupabaseId();
  if (!user) throw new Error('User not found');

  const dataToSave: Prisma.HighlightCreateManyInput[] = [];

  for (const highlight of highlights) {
    const book = await getBookIdAndAuthorByTitle(
      fromFileNameToTitle(highlight.filename)
    );

    if (!book?.id) {
      console.log('Book not found for', highlight.filename);
      continue;
    }

    const highlightsArray = highlight.content.split('\n\n');
    const rawHighlights = highlightsArray.slice(2);

    rawHighlights.forEach((rawHighlight) => {
      const [content, metadata] = rawHighlight.split('\n  - ');
      const pageMatch = metadata.match(/page (\d+)/);
      const locationMatch = metadata.match(/location (\d+-\d+)/);
      const dateMatch = metadata.match(/added on (.+)$/);

      dataToSave.push({
        content: content.replace('- ', '').trim(),
        page: pageMatch ? parseInt(pageMatch[1]) : 0,
        location: locationMatch ? locationMatch[1] : '',
        addedAt: new Date(dateMatch ? dateMatch[1] : new Date()),
        bookTitle: book.title,
        bookId: book.id,
        bookAuthor: book.author,
        userId: user.id,
      });
    });
  }

  try {
    await saveHighlightsDB(dataToSave);
  } catch (error) {
    console.error('Error saving highlights:', error);
  }
};

export const saveBooks = async (books: KindleBook[]) => {
  const user = await getUserBySupabaseId();
  if (!user) throw new Error('User not found');

  const enrichedBooks = await Promise.all(
    books.map(async (book) => {
      const bookInfo = await fetchGoogleBookInfoAction(book.title, book.author);
      if (!bookInfo) return null;

      if (bookInfo.googleBooksId) {
        const existingBook = await findBook(bookInfo.googleBooksId);

        if (existingBook) return null;
      }

      const newBook = {
        title: book.title,
        author: book.author,
        highlightsCount: book.highlights.length,
        commentsCount: 0,
        bookmarksCount: 0,
        userId: user.id,
        googleBooksId: bookInfo.googleBooksId || null,
        isbn13: bookInfo.isbn13 || null,
        isbn10: bookInfo.isbn10 || null,
        imageUrl: bookInfo.imageUrl || null,
        subtitle: bookInfo.subtitle || null,
        publishedDate: bookInfo.publishedDate || null,
        pageCount: bookInfo.pageCount || null,
        description: bookInfo.description || null,
        categories: bookInfo.categories || [],
        googleBooksLink: bookInfo.googleBooksLink || null,
      };

      return newBook;
    })
  );

  const validBooks = enrichedBooks.filter((book) => book !== null);

  if (validBooks.length === 0) {
    return [];
  }

  try {
    await saveBooksDB(validBooks);
  } catch (error) {
    console.error('Error saving books:', error);
  }
};

const cleanKindleTitle = (title: string): string => {
  return title
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/['']/g, "'")
    .replace(/[""]/g, '"')
    .replace(/[éèêë]/g, 'e')
    .replace(/[àâä]/g, 'a')
    .replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ûüù]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[']/g, '')
    .trim();
};

export const fetchGoogleBookInfoAction = async (
  title: string,
  author: string
) => {
  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey) {
      console.error('Google Books API key is not configured');
      return null;
    }

    const cleanedTitle = cleanKindleTitle(title);
    const query = `intitle:"${cleanedTitle}"+inauthor:${author}`;
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        query
      )}&key=${apiKey}`
    );

    if (!response.ok) {
      console.error('Google Books API error:', response.statusText);
      return null;
    }

    let data = (await response.json()) as GoogleBookResponse;
    if (!data.items?.length) {
      const titleWords = cleanedTitle
        .split(' ')
        .filter((word) => word.length > 3);
      const query = `${titleWords.join('+')}+inauthor:${author}`;
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&key=${apiKey}`
      );

      if (!response.ok) return null;
      data = (await response.json()) as GoogleBookResponse;
    }

    if (!data.items?.length) return null;

    const officialBook = data.items.find((book) => {
      const info = book.volumeInfo;
      return (
        !info.title.toLowerCase().includes('tamil') &&
        !info.title.toLowerCase().includes('hindi') &&
        !info.subtitle?.toLowerCase().includes('summary') &&
        !info.description?.toLowerCase().includes('summary of') &&
        (info.pageCount || 0) > 100
      );
    });

    if (!officialBook) return null;

    const volumeInfo = officialBook.volumeInfo;

    return {
      googleBooksId: officialBook.id,
      isbn13:
        volumeInfo.industryIdentifiers?.find(({ type }) => type === 'ISBN_13')
          ?.identifier || null,
      isbn10:
        volumeInfo.industryIdentifiers?.find(({ type }) => type === 'ISBN_10')
          ?.identifier || null,
      imageUrl: volumeInfo.imageLinks?.thumbnail || null,
      subtitle: volumeInfo.subtitle || null,
      publishedDate: volumeInfo.publishedDate || null,
      pageCount: volumeInfo.pageCount || null,
      description: volumeInfo.description || null,
      categories: volumeInfo.categories || [],
      textSnippet: officialBook.searchInfo?.textSnippet || null,
      googleBooksLink: volumeInfo.previewLink || null,
    };
  } catch (error) {
    console.error('Error fetching Google Books info:', error);
    return null;
  }
};
