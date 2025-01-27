import { APIResponse } from '@/types/api';
import { KindleBook } from '@/types/books';
import { MarkdownFile } from '@/types/files';

import { getAccessToken } from '@/utils/user';
export async function exportToMarkdown(
  books: KindleBook[]
): Promise<MarkdownFile[]> {
  const token = await getAccessToken();

  const response = await fetch(
    'http://localhost:4000/api/books/export-markdown',
    {
      method: 'POST',
      body: JSON.stringify({ kindleBooks: books }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to export books');
  }

  const { data } = (await response.json()) as APIResponse<MarkdownFile[]>;
  if (!data) throw new Error('Failed to export books');
  return data;
}
