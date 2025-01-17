import { Book } from '@/features/upload/type';

type ApiResponse<T> = {
  data: T;
  error?: string;
};

export async function extractBooks(content: string): Promise<Book[]> {
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

  const { data } = (await response.json()) as ApiResponse<Book[]>;
  return data;
}
