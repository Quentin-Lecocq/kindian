import { APIResponse } from '@/types/api';
import { KindleBook } from '@/types/books';

export async function extractBooks(content: string): Promise<KindleBook[]> {
  const response = await fetch('/api/extract', {
    method: 'POST',
    body: JSON.stringify({ content }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to extract books');
  }

  const { data } = (await response.json()) as APIResponse<KindleBook[]>;
  if (!data) throw new Error('Failed to extract books');

  return data;
}
