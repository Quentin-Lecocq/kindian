import { useState } from 'react';
import { Book } from '../types';

export const useSelection = (allBooks: Book[]) => {
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
      prev.map((book) => ({ ...book, selected: hasUnselected }))
    );
  };

  return {
    selectedBooks,
    handleToggleSelectBook,
    handleToggleSelectAll,
  };
};
