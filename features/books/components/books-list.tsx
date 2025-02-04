'use client';

import { Book } from '@prisma/client';
import { useOptimistic } from 'react';
import BookCard from './book-card';

type BooksListProps = {
  initialBooks: Book[];
};

type OptimisticAction = {
  type: 'delete';
  id: string;
};

const BooksList = ({ initialBooks }: BooksListProps) => {
  const [optimisticBooks, addOptimisticAction] = useOptimistic(
    initialBooks,
    (state: Book[], action: OptimisticAction) => {
      switch (action.type) {
        case 'delete':
          return state.filter((book) => book.id !== action.id);
        default:
          return state;
      }
    }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {optimisticBooks.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onOptimisticDelete={(id) =>
            addOptimisticAction({ type: 'delete', id })
          }
        />
      ))}
    </div>
  );
};

export default BooksList;
