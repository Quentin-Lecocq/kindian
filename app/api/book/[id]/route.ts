import { db } from '@/db';
import { BooksTable } from '@/db/schema';
import { getUserByClerkId } from '@/utils/auth';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = await getUserByClerkId();

  try {
    await db
      .delete(BooksTable)
      .where(and(eq(BooksTable.id, params.id), eq(BooksTable.userId, id)));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    );
  }

  revalidatePath('/books');

  return NextResponse.json({ status: 200 });
};
