'use client';

import { useGetBooks } from '../hooks/use-get-books';
import BookCard from './book-card';

const BooksList = () => {
  const { data: books, isLoading } = useGetBooks();

  // TODO: handle loading state and no books found
  if (isLoading) return <div>Loading...</div>;
  if (!books) return <div>No books found</div>;
  if (books.length === 0) return <div>No books found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksList;
