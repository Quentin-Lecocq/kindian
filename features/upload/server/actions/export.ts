'use server';

import { parseFileToMarkdown } from '../services/parse';

export const exportSelectedBooks = async (
  fileContent: string,
  selectedBooks: string[]
): Promise<Buffer> => {
  try {
    return await parseFileToMarkdown(fileContent, selectedBooks);
  } catch (error) {
    console.error('Error exporting selected books:', error);
    throw new Error('Failed to export selected books.');
  }
};
