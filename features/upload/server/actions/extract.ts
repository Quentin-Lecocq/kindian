'use server';

import { Book } from '../../type';
import { addHighlightToBook } from '../services/highlight';

export const extractBooksFromClippings = async (
  fileContent: string
): Promise<Book[]> => {
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
