import { Book } from '../../type';

const VALID_CLIPPING_MIN_LINES = 2;

export const addHighlightToBook = (clipping: string, books: Book[]) => {
  const lines = clipping.trim().split('\n');

  if (lines.length < VALID_CLIPPING_MIN_LINES) {
    console.warn('Skipping malformed clipping:', clipping);
    return;
  }

  const [bookTitleWithAuthor, info, ...quoteLines] = lines;

  const quote = quoteLines.join(' ').trim();
  const cleanedInfo = info.trim();
  const sanitizedTitleWithAuthor = bookTitleWithAuthor
    .replace('(Z-Library)', '')
    .trim();

  if (!bookTitleWithAuthor || !cleanedInfo || !quote) {
    console.warn('Incomplete clipping data:', clipping);
    return;
  }

  let book = getBookWithTitle(books, sanitizedTitleWithAuthor);

  if (!book) {
    book = {
      title: sanitizedTitleWithAuthor,
      highlights: [],
    };
    books.push(book);
  }

  book.highlights.push({ info: cleanedInfo, quote });
};

export const getBookWithTitle = (books: Book[], bookTitle: string) => {
  return books.find(({ title }) => title === bookTitle);
};
