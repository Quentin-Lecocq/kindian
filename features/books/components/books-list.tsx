'use client';

import { useBooks } from '../hooks/use-books';
import BookCard from './book-card';

const BooksList = () => {
  const { books, isLoading } = useBooks();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksList;
