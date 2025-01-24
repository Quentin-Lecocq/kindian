import { APIResponse } from '@/types/api';
import { Book } from '../types';

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
