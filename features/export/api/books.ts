import { Book } from '../types';

type ApiResponse<T> = {
  data: T;
  error?: string;
};

export async function saveBooksToDb(books: Book[]): Promise<void> {
  const response = await fetch('/api/book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(books),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save books');
  }

  const { data } = (await response.json()) as ApiResponse<void>;
  return data;
}
