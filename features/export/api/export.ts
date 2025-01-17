import { Book } from '@/features/upload/type';

type MarkdownFile = {
  content: string;
  filename: string;
};

export async function exportToMarkdown(books: Book[]): Promise<MarkdownFile[]> {
  const response = await fetch('/api/export', {
    method: 'POST',
    body: JSON.stringify({ books }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to export books');
  }

  const { data } = await response.json();
  return data;
}
