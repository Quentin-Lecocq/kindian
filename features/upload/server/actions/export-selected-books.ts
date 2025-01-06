'use server';

import { parseFileToMarkdown } from '../services/markdownParser';

export const exportSelectedBooks = async (
  fileContent: string,
  fileName: string,
  selectedBooks: string[]
): Promise<string[]> => {
  try {
    const fileUrls = await parseFileToMarkdown(fileContent, selectedBooks);
    console.log('Markdown files generated:', fileUrls);
    return fileUrls;
  } catch (error) {
    console.error('Error exporting selected books:', error);
    throw new Error('Failed to export selected books.');
  }
};
