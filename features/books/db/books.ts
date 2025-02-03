import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

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
