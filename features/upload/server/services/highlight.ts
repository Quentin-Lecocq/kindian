import { Book } from '../../type';

export const addHighlightToBook = (clipping: string, books: Book[]) => {
  const lines = clipping.trim().split('\n');

  if (lines.length < 2) {
    console.warn('Skipping malformed clipping:', clipping);
    return;
  }

  const [bookTitleWithAuthor, info, ...quoteLines] = lines;
  const quote = quoteLines.join(' ').trim();

  if (!bookTitleWithAuthor || !info || !quote) {
    console.warn('Incomplete clipping data:', clipping);
    return;
  }

  const sanitizedTitleWithAuthor = bookTitleWithAuthor
    .replace('(Z-Library)', '')
    .trim();
  let book = getBookWithTitle(books, sanitizedTitleWithAuthor);

  if (!book) {
    book = {
      title: sanitizedTitleWithAuthor,
      highlights: [],
    };
    books.push(book);
  }

  book.highlights.push({ info, quote });
};

const getBookWithTitle = (books: Book[], bookTitle: string) => {
  return books.find(({ title }) => title === bookTitle);
};
