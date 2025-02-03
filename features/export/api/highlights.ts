import { MarkdownFile } from '@/types/files';
import { getAccessToken } from '@/utils/user';
export async function saveHighlightsToDb(
  highlights: MarkdownFile[]
): Promise<void> {
  const token = await getAccessToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/highlights/save`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(highlights),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save highlights');
  }

  await response.json();
}
