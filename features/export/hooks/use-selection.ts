import { KindleBook } from '@/types/books';
import { useState } from 'react';

export const useSelection = (allBooks: KindleBook[]) => {
  const [selectedBooks, setSelectedBooks] = useState<KindleBook[]>(allBooks);

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
