import { Book } from '../../type';

const VALID_CLIPPING_MIN_LINES = 2;

export const addHighlightToBook = (clipping: string, books: Book[]) => {
  const lines = clipping.trim().split('\n');

  if (lines.length < VALID_CLIPPING_MIN_LINES) {
    console.warn('Skipping malformed clipping:', clipping);
    return;
  }

  const [bookTitleWithAuthor, info, ...quoteLines] = lines;

  const quote = quoteLines.join(' ').trim().toLowerCase();
  const cleanedInfo = info.trim().toLowerCase();

  const { title, author } = parseTitleAndAuthor(bookTitleWithAuthor);

  if (!title || !cleanedInfo || !quote) {
    console.warn('Incomplete clipping data:', clipping);
    return;
  }

  let book = getBookWithTitle(books, title.toLowerCase());

  if (!book) {
    book = {
      title: title.toLowerCase(),
      author: author ?? '',
      highlights: [],
    };

    books.push(book);
  }

  book.highlights.push({ info: cleanedInfo, quote });
};

export const getBookWithTitle = (books: Book[], bookTitle: string) => {
  return books.find(({ title }) => title === bookTitle);
};

function parseTitleAndAuthor(bookTitleWithAuthor: string): {
  title: string;
  author: string | null;
} {
  const cleaned = bookTitleWithAuthor.replace('(Z-Library)', '').trim();

  const match = cleaned.match(/^(.*?)\(([^()]+)\)\s*(?:\([^()]+\))*$/);

  if (match) {
    const title = match[1].trim();
    const author = match[2].trim();
    return { title, author };
  }

  return { title: cleaned, author: null };
}
