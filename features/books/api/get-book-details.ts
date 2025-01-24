'use server';

import { SelectBook } from '@/types/db';
import { getUser } from '@/utils/user';

export const getBookDetails = async (bookId: string): Promise<SelectBook> => {
  const user = await getUser();
  if (!user) throw new Error('User not found');
  try {
    // const book = await db.query.BooksTable.findFirst({
    //   where: ({ id, userId }) => and(eq(id, bookId), eq(userId, user.id)),
    // });
    // if (!book) throw new Error('Book not found');
    // return book;
  } catch (error) {
    console.error('Error fetching book', error);
    throw new Error('Failed to fetch book');
  }
};
