import { Book } from '@prisma/client';
import BookCard from './book-card';

type BooksListProps = {
  books: Book[];
};

const BooksList = ({ books }: BooksListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksList;
