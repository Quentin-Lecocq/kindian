import { NextResponse } from 'next/server';

import { db } from '@/db';
import { BooksTable, InsertBook } from '@/db/schema';
import { Book } from '@/features/upload/type';
import { getUserByClerkId } from '@/utils/auth';

export const POST = async (req: Request) => {
  const user = await getUserByClerkId();

  const rawBooks: Book[] = await req.json();

  if (!Array.isArray(rawBooks)) {
    return NextResponse.json(
      { error: 'Payload must be an array of books' },
      { status: 400 }
    );
  }

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const books: InsertBook[] = rawBooks.map(({ title, author, highlights }) => ({
    userId: user.id,
    title,
    author,
    highlightsCount: highlights.length,
  }));

  try {
    const book = await db.insert(BooksTable).values(books);
    return NextResponse.json({ data: book });
  } catch (error) {
    console.error('Error inserting books', error);
    return NextResponse.json(
      { error: 'Failed to save books' },
      { status: 500 }
    );
  }
};
