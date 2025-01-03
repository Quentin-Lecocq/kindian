'use server';

import { promises as fs } from 'fs';
import path from 'path';

export const uploadFile = async (formData: FormData): Promise<string[]> => {
  const file = formData.get('file') as File;

  if (!file) {
    throw new Error('No file provided. Please upload a valid .txt file.');
  }

  if (file.size === 0) {
    throw new Error('No file uploaded or file is empty.');
  }

  if (!file.name.endsWith('.txt')) {
    throw new Error('File is not a valid .txt file.');
  }

  try {
    const content = await file.text();

    // Analyse du fichier et création des fichiers Markdown
    const fileUrls = await parseFileToMarkdown(
      content,
      file.name.replace('.txt', '')
    );

    console.log(`Markdown files generated successfully: ${fileUrls}`);
    return fileUrls;
  } catch (error) {
    console.error('Error during file processing or saving:', error);
    throw new Error('Failed to upload and process the file.');
  }
};

export const parseFileToMarkdown = async (
  fileContent: string,
  fileName: string
): Promise<string[]> => {
  const clippings = fileContent
    .replace(/\uFEFF/g, '')
    .split('==========') // Utiliser directement le délimiteur
    .map((clipping) => clipping.trim());

  const books: any[] = [];
  clippings.forEach((clipping) => {
    try {
      addHighlightToBook(clipping, books);
    } catch (error) {
      console.error('Error processing clipping:', clipping, error);
    }
  });

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(uploadsDir, { recursive: true });

  // Si un seul livre, regroupez tout dans un fichier nommé comme le fichier TXT
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

  // Si plusieurs livres, créez un fichier par livre
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

// Convert a book to Markdown
const convertBookToMarkdown = (book: any): string => {
  let markdownString = `# ${book.title}\n\n`;

  book.highlights.forEach((highlight: any) => {
    const quoteUpper =
      highlight.quote.charAt(0).toUpperCase() + highlight.quote.substr(1);

    markdownString += `* ${quoteUpper}\n`;
    markdownString += `  ${highlight.info.trim()}\n\n`;
  });

  return markdownString.trim();
};

// Add a highlight to a book
const addHighlightToBook = (clipping: string, books: any[]) => {
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

// Get a book by its title
const getBookWithTitle = (books: any[], bookTitle: string) => {
  return books.find((book) => book.title === bookTitle);
};

// Sanitize file names
const sanitizeFileName = (name: string): string => {
  return name.replace(/[<>:"/\\|?*]+/g, '').trim();
};
