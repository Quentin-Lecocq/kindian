import { APIResponse } from '@/types/api';

export type Book = {
  id: string;
  title: string;
  author: string;
  highlightsCount: number;
  imageUrl?: string;
  bookmarksCount: number;
  commentsCount: number;
  publishedDate?: string;
  pageCount?: number;
  isbn13?: string;
  isbn10?: string;
  categories?: string[];
  textSnippet?: string;
  description?: string;
  googleBooksLink?: string;
};

export const getBookDetails = async (bookId: string): Promise<Book> => {
  const response = await fetch(`http://localhost:4000/api/books/${bookId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error('Book not found');

  const { data } = (await response.json()) as APIResponse<Book>;
  if (!data) throw new Error('Book not found');

  return data;
};
