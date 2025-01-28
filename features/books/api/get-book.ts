import { APIResponse } from '@/types/api';
import { Book } from '../types/types';

export const getBook = async (bookId: string): Promise<Book> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${bookId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) throw new Error('Book not found');

  const { data } = (await response.json()) as APIResponse<Book>;
  if (!data) throw new Error('Book not found');

  return data;
};
