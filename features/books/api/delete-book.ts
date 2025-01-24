import { getAccessToken } from '@/utils/user';

export const deleteBook = async (id: string): Promise<void> => {
  const token = await getAccessToken();
  if (!token) throw new Error('No token available');

  const response = await fetch(`http://localhost:4000/api/books/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
};
