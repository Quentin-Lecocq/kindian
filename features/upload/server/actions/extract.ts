'use server';

import { Book } from '../../type';
import { addHighlightToBook } from '../services/highlight';
import { fetchBooksCover } from './fetch';

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

  for (const book of books) {
    try {
      book.coverUrl = await fetchBooksCover(book.title, book.author);
    } catch (error) {
      console.error('Error fetching cover URL:', book.title, error);
    }
  }

  console.log(books);
  return books;
};
