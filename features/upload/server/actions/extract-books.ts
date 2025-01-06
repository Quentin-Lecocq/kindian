'use server';

import { extractBooksFromClippings } from '../services/markdownParser';

export const handleExtractBooks = async (fileContent: string) => {
  return extractBooksFromClippings(fileContent);
};
