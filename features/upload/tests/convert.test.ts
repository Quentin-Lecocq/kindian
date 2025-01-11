import { describe, expect, it } from 'vitest';
import { convertBookToMarkdown } from '../server/services/convert';

describe('convertBookToMarkdown', () => {
  it('should generate correct markdown for a book', () => {
    const book = {
      title: 'Test Book',
      highlights: [
        { quote: 'Highlight 1', info: 'Page 10' },
        { quote: 'Highlight 2', info: 'Page 20' },
      ],
    };

    const markdown = convertBookToMarkdown(book);

    expect(markdown).toBe(
      `# Test Book\n\n* Highlight 1\n  Page 10\n\n* Highlight 2\n  Page 20`
    );
  });

  it('should handle empty highlights', () => {
    const book = {
      title: 'Test Book',
      highlights: [],
    };

    const markdown = convertBookToMarkdown(book);

    expect(markdown).toBe(`# Test Book`);
  });
});
