'use server';

import { deleteBookDB } from '@/features/books/db/books';

export const deleteBook = async (id: string) => {
  console.log('deleteBook', id);
  try {
    await deleteBookDB(id);
    return { error: false, message: 'Book deleted successfully' };
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Failed to delete book' };
  }
};
