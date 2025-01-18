import { NextResponse } from 'next/server';

import { db } from '@/db';
import { BooksTable, InsertBook } from '@/db/schema';
import { fetchGoogleBookInfo } from '@/features/export/services/google-books';
import { Book } from '@/features/export/types';
import { getUserByClerkId } from '@/utils/auth';
import { eq } from 'drizzle-orm';

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

  try {
    const enrichedBooks = await Promise.all(
      rawBooks.map(async (book) => {
        const bookInfo = await fetchGoogleBookInfo(book.title, book.author);
        if (!bookInfo) return null;

        if (bookInfo.googleBooksId) {
          const existingBook = await db
            .select()
            .from(BooksTable)
            .where(eq(BooksTable.googleBooksId, bookInfo.googleBooksId))
            .limit(1);

          if (existingBook.length > 0) {
            console.log(`Livre déjà existant : ${book.title}`);
            return null;
          }
        }
        return {
          ...book,
          ...(bookInfo || {}),
          userId: user.id,
          highlightsCount: book.highlights.length,
        };
      })
    );

    const newBooks = enrichedBooks.filter(Boolean);

    if (newBooks.length > 0) {
      const books = await db
        .insert(BooksTable)
        .values(newBooks as InsertBook[]);

      return NextResponse.json({ data: books });
    }

    return NextResponse.json({
      message: 'Tous les livres existent déjà',
      data: [],
    });
  } catch (error) {
    console.error('Error inserting books', error);
    return NextResponse.json(
      { error: 'Failed to save books' },
      { status: 500 }
    );
  }
};

export async function GET() {
  try {
    const user = await getUserByClerkId();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const books = await db
      .select()
      .from(BooksTable)
      .where(eq(BooksTable.userId, user.id))
      .orderBy(BooksTable.createdAt);

    return NextResponse.json({ data: books });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}
