import { APIResponse } from '@/types/api';
import { KindleBook } from '@/types/books';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { content } = await req.json();

    if (!content || typeof content !== 'string') {
      return NextResponse.json<APIResponse<null>>(
        {
          data: null,
          error: 'Invalid file content',
        },
        { status: 422 }
      );
    }

    const clippings = content
      .replace(/\uFEFF/g, '')
      .split('==========')
      .map((clipping) => clipping.trim())
      .filter(Boolean);

    const books: KindleBook[] = [];

    for (const clipping of clippings) {
      const lines = clipping.split('\n').filter(Boolean);
      if (lines.length < 3) continue;

      const [titleLine, infoLine, quote] = lines;
      const title = titleLine.match(/^[^(]+/)?.[0]?.trim();
      const author = titleLine.match(/\(([^)]+)\)$/)?.[1];

      if (!title || !author) continue;

      let book = books.find(
        (book) => book.title.toLowerCase() === title.toLowerCase()
      );

      if (!book) {
        book = {
          id: randomUUID(),
          title,
          author,
          highlights: [],
          selected: false,
        };
        books.push(book);
      }

      book.highlights.push({
        quote: quote.toLowerCase(),
        info: infoLine.toLowerCase(),
      });
    }

    return NextResponse.json({ data: books });
  } catch (error) {
    console.error('Error extracting books:', error);
    return NextResponse.json<APIResponse<null>>(
      {
        data: null,
        error: 'Failed to extract books',
      },
      { status: 500 }
    );
  }
};
