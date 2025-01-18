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
  const { title, author, highlightsCount, id } = book;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{author}</CardDescription>
        <p className="text-sm text-muted-foreground">
          {highlightsCount} highlights
        </p>
      </CardHeader>
      <CardFooter>
        {id && (
          <>
            <OpenBookBtn bookId={id} />
            <DeleteBookBtn bookId={id} />
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;
