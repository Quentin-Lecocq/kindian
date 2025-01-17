'use client';

import { useBooks } from '../hooks/use-books';
import DeleteBookBtn from './delete-book-btn';

const BooksList = () => {
  const { books, isLoading } = useBooks();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <div key={book.id} className="border p-4 rounded-lg">
          <h3 className="text-lg font-bold">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          <p className="text-sm text-muted-foreground">
            {book.highlightsCount} highlights
          </p>
          <DeleteBookBtn bookId={book.id!} />
        </div>
      ))}
    </div>
  );
};

export default BooksList;
