import { describe, expect, it } from 'vitest';
import { Book, Highlight } from '../../type';
import { addHighlightToBook, getBookWithTitle } from './highlight';

describe('addHighlightToBook', () => {
  it('should add a highlight to a book', () => {
    const book: Book = {
      title: 'test book',
      author: 'author',
      highlights: [] as Highlight[],
      selected: false,
    };

    const clipping = 'Test Book (Z-Library)\nPage 10\nHighlight 1';

    addHighlightToBook(clipping, [book]);

    expect(book.highlights[0].quote).toBe('highlight 1');
    expect(book.highlights[0].info).toBe('page 10');
    expect(book.title).toBe('test book');
  });

  it('should add a highlight to an existing book', () => {
    const books: Book[] = [
      {
        title: 'sample book',
        author: 'author',
        highlights: [{ info: 'page 5', quote: 'first highlight.' }],
      },
    ];
    const clipping = `Sample Book (Author)
      Page 10
      Second highlight.`;

    addHighlightToBook(clipping, books);

    expect(books[0].highlights).toHaveLength(2);
    expect(books[0].highlights[1]).toEqual({
      info: 'page 10',
      quote: 'second highlight.',
    });
  });

  it('should skip malformed clippings', () => {
    const clipping = 'Invalid clipping';
    const books: Book[] = [];

    addHighlightToBook(clipping, books);

    expect(books).toHaveLength(0);
  });
});

describe('getBookWithTitle', () => {
  it('should return the book with the matching title', () => {
    const books: Book[] = [
      { title: 'test book', author: 'author', highlights: [] },
      {
        title: 'another book',
        author: 'author',
        highlights: [],
      },
    ];
    const title = 'test book';

    const book = getBookWithTitle(books, title);

    expect(book).toEqual({
      title: 'test book',
      author: 'author',
      highlights: [],
    });
  });

  it('should return undefined if no book is found', () => {
    const books: Book[] = [
      { title: 'Test Book', author: 'author', highlights: [] },
    ];
    const title = 'Non-existent Book';

    const book = getBookWithTitle(books, title);
    expect(book).toBeUndefined();
  });
});
