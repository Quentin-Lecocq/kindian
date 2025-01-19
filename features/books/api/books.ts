import { APIResponse } from '@/types/api';
import { SelectBook } from '@/types/db';

export const getBooks = async (): Promise<SelectBook[]> => {
  const response = await fetch('/api/book');
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const { data } = (await response.json()) as APIResponse<SelectBook[]>;
  if (!data) throw new Error('No data received from server');

  return data;
};

export const deleteBook = async (id: string): Promise<void> => {
  const response = await fetch(`/api/book/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const { error } = (await response.json()) as APIResponse<null>;
  if (error) throw new Error(error);
};
