import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Book } from '../api/get-book-details';
import { usePrefetchBook } from '../hooks/use-book-details';
import DeleteBookBtn from './delete-book-btn';
import OpenBookBtn from './open-book-btn';

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  const { title, author, highlightsCount, id } = book;
  const prefetchBook = usePrefetchBook();

  return (
    <Card
      className="flex flex-col justify-between rounded-sm"
      onMouseEnter={() => id && prefetchBook(id)}
    >
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
