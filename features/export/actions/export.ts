'use server';

import { prisma } from '@/lib/prisma';
import { KindleBook } from '@/types/books';
import { getUserBySupabaseId } from '@/utils/user';
import { randomUUID } from 'crypto';

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

interface GoogleBookResponse {
  items?: GoogleBookItem[];
}

export async function extractBooksAction(
  content: string
): Promise<KindleBook[]> {
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
}

export async function saveBooksToDB(books: KindleBook[]) {
  const user = await getUserBySupabaseId();
  if (!user) throw new Error('User not found');

  const enrichedBooks = await Promise.all(
    books.map(async (book) => {
      const bookInfo = await fetchGoogleBookInfoAction(book.title, book.author);
      if (!bookInfo) return null;

      if (bookInfo.googleBooksId) {
        const existingBook = await prisma.book.findFirst({
          where: {
            googleBooksId: bookInfo.googleBooksId,
          },
        });

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

  await prisma.book.createMany({
    data: validBooks,
  });

  // return validBooks;
}

function cleanKindleTitle(title: string): string {
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
}

export async function fetchGoogleBookInfoAction(title: string, author: string) {
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
}
