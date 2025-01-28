import { getAccessToken } from '@/utils/user';

export const deleteBook = async (id: string): Promise<void> => {
  const token = await getAccessToken();
  if (!token) throw new Error('No token available');

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
};
