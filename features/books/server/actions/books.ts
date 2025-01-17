'use server';

import { getUserByClerkId } from '@/utils/auth';
import { deleteBookDb } from '../db/books';

export const deleteBook = async (bookId: string) => {
  const { id } = await getUserByClerkId();

  await deleteBookDb({ bookId, userId: id });
};
