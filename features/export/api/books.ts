import { KindleBook } from '@/types/books';
import { getAccessToken } from '@/utils/user';

export async function saveBooksToDb(books: KindleBook[]): Promise<void> {
  const token = await getAccessToken();
  const response = await fetch(
    'http://localhost:4000/api/books/import-kindle',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(books),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save books');
  }

  const result = await response.json();
  if (!result.data) throw new Error('Failed to save books');
}
