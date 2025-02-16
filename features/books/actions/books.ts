'use server';

import { deleteBookDB, getFavoritesBooksDB } from '@/features/books/db/books';
import { Book } from '@prisma/client';

type BookResponse = {
  error: boolean;
  message: string;
};

export const getFavoritesBooks = async (): Promise<Book[]> => {
  try {
    const favoritesBooks = await getFavoritesBooksDB();
    return favoritesBooks;
  } catch (error) {
    console.error(error);
    return [];
  }
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
