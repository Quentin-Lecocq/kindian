import { NextResponse } from 'next/server';

import { db } from '@/db';
import { BooksTable, InsertBook, SelectBook } from '@/db/schema';
import { fetchGoogleBookInfo } from '@/features/export/services/google-books';
import { Book } from '@/features/export/types';
import { APIResponse } from '@/types/api';
import { getUserByClerkId } from '@/utils/auth';
import { eq } from 'drizzle-orm';

export const POST = async (req: Request) => {
  const user = await getUserByClerkId();
  const rawBooks: Book[] = await req.json();

  if (!Array.isArray(rawBooks)) {
    return NextResponse.json<APIResponse<null>>(
      {
        data: null,
        error: 'Payload must be an array of books',
      },
      { status: 422 }
    );
  }

  if (!user) {
    return NextResponse.json<APIResponse<null>>(
      {
        data: null,
        error: 'Unauthorized',
      },
      { status: 401 }
    );
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

          if (existingBook.length > 0) return null;
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

      return NextResponse.json<APIResponse<InsertBook[]>>(
        {
          data: books,
          error: null,
          count: newBooks.length,
        },
        { status: 200 }
      );
    }

    return NextResponse.json<APIResponse<InsertBook[]>>(
      {
        data: [],
        error: null,
        count: 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error inserting books', error);
    return NextResponse.json<APIResponse<null>>(
      {
        data: null,
        error: 'Failed to save books',
      },
      { status: 500 }
    );
  }
};

export async function GET() {
  try {
    const user = await getUserByClerkId();
    if (!user) {
      return NextResponse.json<APIResponse<null>>(
        {
          data: null,
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }

    const books = await db
      .select()
      .from(BooksTable)
      .where(eq(BooksTable.userId, user.id))
      .orderBy(BooksTable.createdAt);

    return NextResponse.json<APIResponse<SelectBook[]>>(
      {
        data: books,
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json<APIResponse<null>>(
      {
        data: null,
        error: 'Failed to fetch books',
      },
      { status: 500 }
    );
  }
}
