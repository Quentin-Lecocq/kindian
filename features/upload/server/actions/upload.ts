'use server';

import { promises as fs } from 'fs';
import path from 'path';

export const uploadFile = async (formData: FormData): Promise<string> => {
  const file = formData.get('file') as File;

  if (file.size === 0) {
    throw new Error('No file uploaded or file is empty');
  }

  if (!file.name.endsWith('.txt')) {
    throw new Error('File is not a txt file');
  }

  try {
    const content = await file.text();
    const markdown = parseFileToMarkdown(content);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    const filePath = path.join(uploadsDir, 'output.md');
    await fs.writeFile(filePath, markdown, 'utf8');

    return `/uploads/output.md`;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to upload file');
  }
};

const parseFileToMarkdown = (fileContent: string): string => {
  const lines = fileContent.split('\n');

  const markdown = lines
    .filter((line) => line.trim() !== '')
    .map((line) => `- ${line.trim()}`);

  return markdown.join('\n');
};
