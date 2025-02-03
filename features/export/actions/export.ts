'use server';

import { KindleBook } from '@/types/books';
import { randomUUID } from 'crypto';

export async function extractBooksAction(
  content: string
): Promise<KindleBook[]> {
  console.log('extractBooks', content);

  try {
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

    return books;
  } catch (error) {
    console.error('Error extracting books', error);
    throw error;
  }
}
