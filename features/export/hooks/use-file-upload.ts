import { useToast } from '@/hooks/use-toast';
import { KindleBook } from '@/types/books';
import { useState } from 'react';
import { extractBooksAction } from '../actions/export';

export const useFileUpload = () => {
  const { toast } = useToast();
  const [books, setBooks] = useState<KindleBook[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    try {
      const content = await file.text();
      const extractedBooks = await extractBooksAction(content);
      console.log('extractedBooks', extractedBooks);
      setBooks(extractedBooks);
      setError(null);
      toast({
        title: 'Books extracted',
        description: `${extractedBooks.length} books have been extracted from the file`,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'An error occurred while extracting books',
      });
    }
  };

  return {
    books,
    error,
    handleFileChange,
  };
};
