import JSZip from 'jszip';
import { sanitizeFileName } from '../../lib/utils';
import { Book } from '../../type';
import { convertBookToMarkdown } from './convert';
import { addHighlightToBook } from './highlight';

export const parseFileToMarkdown = async (
  fileContent: string,
  selectedBooks: string[]
): Promise<Buffer> => {
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

  const filteredBooks = books.filter(({ title }) =>
    selectedBooks.includes(title)
  );

  if (filteredBooks.length === 0) {
    throw new Error('No valid books selected for export.');
  }

  const zip = new JSZip();

  for (const book of filteredBooks) {
    const bookMarkdown = convertBookToMarkdown(book);
    const fileName = `${sanitizeFileName(book.title)}.md`;
    zip.file(fileName, bookMarkdown);
  }

  return zip.generateAsync({ type: 'nodebuffer' });
};
