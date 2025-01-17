import { InsertBook } from '@/db/schema';
import DeleteBookBtn from './delete-book-btn';
import OpenBookBtn from './open-book-btn';

type BookCardProps = {
  book: InsertBook;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="border p-4 rounded-sm text-foreground">
      <h4 className="text-lg font-bold truncate">{book.title}</h4>
      <p className="text-sm text-muted-foreground">{book.author}</p>
      <p className="text-sm text-muted-foreground">
        {book.highlightsCount} highlights
      </p>
      <div className="mt-4 flex justify-end gap-2">
        <OpenBookBtn bookId={book.id!} />
        <DeleteBookBtn bookId={book.id!} />
      </div>
    </div>
  );
};

export default BookCard;
