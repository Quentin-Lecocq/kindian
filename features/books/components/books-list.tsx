import { Book } from '@prisma/client';
import BookCard from './book-card';

type BooksListProps = {
  books: Book[];
};

const BooksList = ({ books }: BooksListProps) => {
  // TODO: handle loading state and no books found
  // if (isLoading) return <div>Loading...</div>;
  // if (!books) return <div>No books found</div>;
  // if (books.length === 0) return <div>No books found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksList;
