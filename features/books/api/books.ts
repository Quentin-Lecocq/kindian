import { InsertBook } from '@/db/schema';

type ApiResponse<T> = {
  data: T;
  error?: string;
};

export const getBooks = async (): Promise<InsertBook[]> => {
  const response = await fetch('/api/book');
  if (!response.ok) throw new Error('Failed to fetch books');
  const { data } = (await response.json()) as ApiResponse<InsertBook[]>;
  return data;
};

export const deleteBook = async (id: string): Promise<void> => {
  const response = await fetch(`/api/book/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to delete book');
  }
};
