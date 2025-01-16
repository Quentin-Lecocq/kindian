import { NextResponse } from 'next/server';

import { db } from '@/db';
import { BooksTable } from '@/db/schema';
import { getUserByClerkId } from '@/utils/auth';

export const POST = async (req: Request) => {
  const user = await getUserByClerkId();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, author } = await req.json();

  const book = await db.insert(BooksTable).values({
    userId: user.id,
    title,
    author,
  });

  console.log('----------');
  console.log({ book });
  console.log('----------');

  return NextResponse.json({ data: book });
};
