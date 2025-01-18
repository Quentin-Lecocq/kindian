import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { InsertBook } from '@/db/schema';
import DeleteBookBtn from './delete-book-btn';
import OpenBookBtn from './open-book-btn';

type BookCardProps = {
  book: InsertBook;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{book.title}</CardTitle>
        <CardDescription>{book.author}</CardDescription>
        <p className="text-sm text-muted-foreground">
          {book.highlightsCount} highlights
        </p>
      </CardHeader>
      <CardFooter>
        <OpenBookBtn bookId={book.id!} />
        <DeleteBookBtn bookId={book.id!} />
      </CardFooter>
    </Card>
  );
};

export default BookCard;
