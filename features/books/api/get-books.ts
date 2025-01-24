import { APIResponse } from '@/types/api';
import { getAccessToken } from '@/utils/user';
import { Book } from '../types';

export const getBooks = async (): Promise<Book[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('No token available');

  const response = await fetch('http://localhost:4000/api/books/my-books', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const { data } = (await response.json()) as APIResponse<Book[]>;
  if (!data) throw new Error('No data received from server');

  return data;
};
