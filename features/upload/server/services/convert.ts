import { Book, Highlight } from '../../type';

export const convertBookToMarkdown = (book: Book): string => {
  let markdownString = `# ${book.title}\n\n`;

  book.highlights.forEach(({ quote, info }: Highlight) => {
    markdownString += `* ${quote}\n`;
    markdownString += `  ${info.trim().toLowerCase()}\n\n`;
  });

  return markdownString.trim();
};
