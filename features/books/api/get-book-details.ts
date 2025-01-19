'use server';

import { db } from '@/db';
import { SelectBook } from '@/types/db';
import { getUserByClerkId } from '@/utils/auth';
import { and, eq } from 'drizzle-orm';

export const getBookDetails = async (bookId: string): Promise<SelectBook> => {
  const user = await getUserByClerkId();

  try {
    const book = await db.query.BooksTable.findFirst({
      where: ({ id, userId }) => and(eq(id, bookId), eq(userId, user.id)),
    });
    if (!book) throw new Error('Book not found');
    return book;
  } catch (error) {
    console.error('Error fetching book', error);
    throw new Error('Failed to fetch book');
  }
};
