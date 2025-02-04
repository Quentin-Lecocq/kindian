'use server';

import { deleteBookDB } from '@/features/books/db/books';

type BookResponse = {
  error: boolean;
  message: string;
};

export const deleteBook = async (bookId: string): Promise<BookResponse> => {
  try {
    await deleteBookDB(bookId);
    return {
      error: false,
      message: 'Book deleted successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: 'Failed to delete book',
    };
  }
};
