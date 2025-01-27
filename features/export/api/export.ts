import { APIResponse } from '@/types/api';
import { KindleBook } from '@/types/books';
import { MarkdownFile } from '@/types/files';

export async function exportToMarkdown(
  books: KindleBook[]
): Promise<MarkdownFile[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books/export-markdown`,
    {
      method: 'POST',
      body: JSON.stringify({ kindleBooks: books }),
      headers: {
        'Content-Type': 'application/json',
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
