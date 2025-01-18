import { db } from '@/db';
import { InsertBook } from '@/db/schema';
import { getUserByClerkId } from '@/utils/auth';
import { and, eq } from 'drizzle-orm';

export const getBookDetails = async (
  bookId: string
): Promise<InsertBook | undefined> => {
  const user = await getUserByClerkId();

  try {
    const book = await db.query.BooksTable.findFirst({
      where: ({ id, userId }) => and(eq(id, bookId), eq(userId, user.id)),
    });
    return book;
  } catch (error) {
    console.error('Error fetching book', error);
    return undefined;
  }
};
