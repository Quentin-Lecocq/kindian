import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { InsertBook } from '@/types/db';
import DeleteBookBtn from './delete-book-btn';
import OpenBookBtn from './open-book-btn';

type BookCardProps = {
  book: InsertBook;
};

const BookCard = ({ book }: BookCardProps) => {
  const { title, author, highlightsCount, id } = book;

  return (
    <Card className="flex flex-col justify-between rounded-sm">
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
            <OpenBookBtn id={id} />
            <DeleteBookBtn id={id} />
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookCard;
