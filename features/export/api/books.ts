import { APIResponse } from '@/types/api';
import { KindleBook } from '@/types/books';

export async function saveBooksToDb(books: KindleBook[]): Promise<void> {
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

  const { data } = (await response.json()) as APIResponse<void>;
  if (!data) throw new Error('Failed to save books');

  return data;
}
