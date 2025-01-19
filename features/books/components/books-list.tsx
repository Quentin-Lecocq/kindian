'use client';

import { useBooks } from '../hooks/use-books';
import BookCard from './book-card';

const BooksList = () => {
  const { books, isLoading } = useBooks();

  // TODO: handle loading state and no books found
  if (isLoading) return <div>Loading...</div>;

  if (books.length === 0) return <div>No books found</div>;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksList;
