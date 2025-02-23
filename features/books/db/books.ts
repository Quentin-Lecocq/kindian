import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const getFavoritesBooksDB = async () => {
  // favorites books doesnt exist yet
  const favoritesBooks = await prisma.book.findMany();

  if (favoritesBooks == null) {
    throw new Error('Favorites books not found');
  }

  return favoritesBooks;
};

export const findBook = async (googleBooksId: string) => {
  return prisma.book.findFirst({
    where: {
      googleBooksId,
    },
  });
};

export const saveBooksDB = async (books: Prisma.BookCreateManyInput[]) => {
  const savedBooks = await prisma.book.createMany({
    data: books,
  });

  if (savedBooks == null) {
    throw new Error('Failed to save books');
  }

  return savedBooks;
};

export const getBookByTitleDB = async (title: string) => {
  const book = await prisma.book.findFirst({
    where: {
      title: {
        equals: title,
        mode: 'insensitive',
      },
    },
  });

  if (book == null) {
    throw new Error('Book not found');
  }

  return book;
};

export const deleteBookDB = async (bookId: string) => {
  const deletedBook = await prisma.book.delete({
    where: {
      id: bookId,
    },
  });

  if (deletedBook == null) {
    throw new Error('Book not found');
  }

  revalidatePath('/books');

  return deletedBook;
};
