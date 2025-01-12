import { describe, expect, it } from 'vitest';
import { convertBookToMarkdown } from './convert';

describe('convertBookToMarkdown', () => {
  it('should generate correct markdown for a book', () => {
    const book = {
      title: 'Test Book',
      author: 'author',
      highlights: [
        { quote: 'highlight 1', info: 'page 10' },
        { quote: 'highlight 2', info: 'page 20' },
      ],
    };

    const markdown = convertBookToMarkdown(book);

    expect(markdown).toBe(
      `# Test Book\n\n* highlight 1\n  page 10\n\n* highlight 2\n  page 20`
    );
  });

  it('should handle empty highlights', () => {
    const book = {
      title: 'Test Book',
      author: 'author',
      highlights: [],
    };

    const markdown = convertBookToMarkdown(book);

    expect(markdown).toBe(`# Test Book`);
  });
});
