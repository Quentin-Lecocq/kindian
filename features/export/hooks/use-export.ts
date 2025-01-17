import JSZip from 'jszip';
import { useState } from 'react';
import { saveBooksToDb } from '../api/books';
import { exportToMarkdown } from '../api/export';
import { Book } from '../types';

export const useExport = (allBooks: Book[]) => {
  const [selectedBooks, setSelectedBooks] = useState<Book[]>(allBooks);

  const handleToggleSelectBook = (id: string) => {
    setSelectedBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, selected: !book.selected } : book
      )
    );
  };

  const handleToggleSelectAll = () => {
    const hasUnselected = selectedBooks.some(({ selected }) => !selected);

    setSelectedBooks((prev) =>
      prev.map((book) => ({
        ...book,
        selected: hasUnselected,
      }))
    );
  };

  const handleExport = async ({
    onlySelectedBooks,
  }: {
    onlySelectedBooks: boolean;
  }) => {
    const books = onlySelectedBooks
      ? selectedBooks.filter(({ selected }) => selected)
      : allBooks;

    try {
      await saveBooksToDb(books);

      const files = await exportToMarkdown(books);
      const zip = new JSZip();

      files.forEach((file) => {
        zip.file(file.filename, file.content);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'kindle-notes.zip';
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting books:', error);
    }
  };

  return {
    handleExport,
    selectedBooks,
    handleToggleSelectBook,
    handleToggleSelectAll,
  };
};
