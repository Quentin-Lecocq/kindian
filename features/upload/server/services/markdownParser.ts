import { promises as fs } from 'fs';
import path from 'path';
import { Book, Highlight } from '../../type';
import { sanitizeFileName } from '../lib/utils';

export const extractBooksFromClippings = (fileContent: string): Book[] => {
  const clippings = fileContent
    .replace(/\uFEFF/g, '')
    .split('==========')
    .map((clipping) => clipping.trim());

  const books: Book[] = [];

  clippings.forEach((clipping) => {
    try {
      addHighlightToBook(clipping, books);
    } catch (error) {
      console.error('Error processing clipping:', clipping, error);
    }
  });

  return books;
};

export const generateMarkdownFiles = async (
  books: Book[],
  fileName: string
): Promise<string[]> => {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadsDir, { recursive: true });

  if (books.length === 1) {
    const book = books[0];
    const globalMarkdown = convertBookToMarkdown(book);
    const globalFilePath = path.join(
      uploadsDir,
      `${sanitizeFileName(fileName)}.md`
    );
    await fs.writeFile(globalFilePath, globalMarkdown, 'utf8');
    return [`/uploads/${sanitizeFileName(fileName)}.md`];
  }

  const fileUrls: string[] = [];
  for (const book of books) {
    const bookMarkdown = convertBookToMarkdown(book);
    const bookFilePath = path.join(
      uploadsDir,
      `${sanitizeFileName(book.title)}.md`
    );
    await fs.writeFile(bookFilePath, bookMarkdown, 'utf8');
    fileUrls.push(`/uploads/${sanitizeFileName(book.title)}.md`);
  }

  return fileUrls;
};

const convertBookToMarkdown = (book: Book): string => {
  let markdownString = `# ${book.title}\n\n`;

  book.highlights.forEach((highlight: Highlight) => {
    const quoteUpper =
      highlight.quote.charAt(0).toUpperCase() + highlight.quote.substr(1);

    markdownString += `* ${quoteUpper}\n`;
    markdownString += `  ${highlight.info.trim()}\n\n`;
  });

  return markdownString.trim();
};

export const parseFileToMarkdown = async (
  fileContent: string,
  // useless ????
  fileName: string,
  selectedBooks: string[]
): Promise<string[]> => {
  const clippings = fileContent
    .replace(/\uFEFF/g, '')
    .split('==========')
    .map((clipping) => clipping.trim());

  const books: Book[] = [];

  clippings.forEach((clipping) => {
    try {
      addHighlightToBook(clipping, books);
    } catch (error) {
      console.error('Error processing clipping:', clipping, error);
    }
  });

  const filteredBooks = books.filter((book) =>
    selectedBooks.includes(book.title)
  );

  if (filteredBooks.length === 0) {
    throw new Error('No valid books selected for export.');
  }

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadsDir, { recursive: true });

  const fileUrls: string[] = [];
  for (const book of filteredBooks) {
    const bookMarkdown = convertBookToMarkdown(book);
    const bookFilePath = path.join(
      uploadsDir,
      `${sanitizeFileName(book.title)}.md`
    );
    await fs.writeFile(bookFilePath, bookMarkdown, 'utf8');
    fileUrls.push(`/uploads/${sanitizeFileName(book.title)}.md`);
  }

  return fileUrls;
};

const addHighlightToBook = (clipping: string, books: Book[]) => {
  const lines = clipping.trim().split('\n');

  if (lines.length < 2) {
    console.warn('Skipping malformed clipping:', clipping);
    return;
  }

  const [bookTitleWithAuthor, info, ...quoteLines] = lines;
  const quote = quoteLines.join(' ').trim();

  if (!bookTitleWithAuthor || !info || !quote) {
    console.warn('Incomplete clipping data:', clipping);
    return;
  }

  const sanitizedTitleWithAuthor = bookTitleWithAuthor
    .replace('(Z-Library)', '')
    .trim();
  let book = getBookWithTitle(books, sanitizedTitleWithAuthor);

  if (!book) {
    book = {
      title: sanitizedTitleWithAuthor,
      highlights: [],
    };
    books.push(book);
  }

  book.highlights.push({ info, quote });
};

const getBookWithTitle = (books: Book[], bookTitle: string) => {
  return books.find((book) => book.title === bookTitle);
};
