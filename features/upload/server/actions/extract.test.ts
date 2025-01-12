import { describe, expect, it } from 'vitest';
import { extractBooksFromClippings } from './extract';

describe('extractBooksFromClippings', () => {
  it('should clean and process clippings correctly', async () => {
    const fileContent = `
      Book Title (Author)
      Page 10
      First highlight.

      ==========

      Book Title (Author)
      Page 15
      Second highlight.    

      ==========
    `;

    const books = await extractBooksFromClippings(fileContent);

    expect(books).toHaveLength(1);
    expect(books[0].highlights).toEqual([
      { info: 'page 10', quote: 'first highlight.' },
      { info: 'page 15', quote: 'second highlight.' },
    ]);
    expect(books[0].title).toBe('book title');
    expect(books[0].author).toBe('author');
  });
});
