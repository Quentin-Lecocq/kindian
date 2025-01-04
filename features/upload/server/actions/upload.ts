'use server';

import { parseFileToMarkdown } from '../services/markdownParser';

export const uploadFile = async (formData: FormData): Promise<string[]> => {
  const file = formData.get('file') as File;

  if (!file) {
    throw new Error('No file provided. Please upload a valid .txt file.');
  }

  if (file.size === 0) {
    throw new Error('No file uploaded or file is empty.');
  }

  if (!file.name.endsWith('.txt')) {
    throw new Error('File is not a valid .txt file.');
  }

  try {
    const content = await file.text();

    const fileUrls = await parseFileToMarkdown(
      content,
      file.name.replace('.txt', '')
    );

    console.log(`Markdown files generated successfully: ${fileUrls}`);
    return fileUrls;
  } catch (error) {
    console.error('Error during file processing or saving:', error);
    throw new Error('Failed to upload and process the file.');
  }
};
