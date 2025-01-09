import { Book, Highlight } from '../../type';

export const convertBookToMarkdown = (book: Book): string => {
  let markdownString = `# ${book.title}\n\n`;

  book.highlights.forEach(({ quote, info }: Highlight) => {
    const quoteUpper = quote.charAt(0).toUpperCase() + quote.substr(1);

    markdownString += `* ${quoteUpper}\n`;
    markdownString += `  ${info.trim()}\n\n`;
  });

  return markdownString.trim();
};
