import { db } from '@/db';
import { BooksTable } from '@/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate';

export const deleteBookDb = async ({
  bookId,
  userId,
}: {
  bookId: string;
  userId: string;
}) => {
  await db
    .delete(BooksTable)
    .where(and(eq(BooksTable.id, bookId), eq(BooksTable.userId, userId)));

  revalidatePath('/books');

  return { status: 200 };
};
