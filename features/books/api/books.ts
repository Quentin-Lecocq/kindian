import { APIResponse } from '@/types/api';
import { getAccessToken } from '@/utils/user';

export const getBooks = async (): Promise<any[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('No token available');

  const response = await fetch('http://localhost:4000/api/books/my-books', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const { data } = (await response.json()) as APIResponse<any[]>;
  if (!data) throw new Error('No data received from server');

  return data;
};

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
