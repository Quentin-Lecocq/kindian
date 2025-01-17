import { Book } from '@/features/upload/type';
import { useState } from 'react';
import { extractBooks } from '../api/extract';

export const useFileUpload = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    try {
      const content = await file.text();
      const extractedBooks = await extractBooks(content);
      setBooks(extractedBooks);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    }
  };

  return { books, error, handleFileChange };
};
