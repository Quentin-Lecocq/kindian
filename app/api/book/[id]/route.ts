import { db } from '@/db';
import { BooksTable } from '@/db/schema';
import { APIResponse } from '@/types/api';
import { getUserByClerkId } from '@/utils/auth';
import { and, eq } from 'drizzle-orm';
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
    console.error('Failed to delete book', error);
    return NextResponse.json<APIResponse<null>>(
      {
        data: null,
        error: 'Failed to delete book',
      },
      { status: 500 }
    );
  }

  return NextResponse.json<APIResponse<null>>(
    {
      data: null,
      error: null,
    },
    { status: 200 }
  );
};
