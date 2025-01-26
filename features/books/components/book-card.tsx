import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { usePrefetchGetBook } from '../hooks/use-prefetch-get-book';
import { Book } from '../types';
import BookCardActions from './book-card-actions';
import BookCardImage from './book-card-image';
import BookCardInfo from './book-card-info';

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  const { title, author, googleBooksLink, description, id, imageUrl } = book;
  const prefetchBook = usePrefetchGetBook();

  return (
    <Card
      className="flex flex-col shadow-none justify-between rounded-sm border-none max-w-[28rem] p-2"
      onMouseEnter={() => id && prefetchBook(id)}
    >
      <CardContent className="flex justify-between gap-4 p-0">
        <BookCardImage id={id} title={title} imageUrl={imageUrl} />
        <BookCardInfo title={title} author={author} description={description} />
      </CardContent>
      <CardFooter className="p-0 mt-2">
        <BookCardActions id={id} googleBooksLink={googleBooksLink} />
      </CardFooter>
    </Card>
  );
};

export default BookCard;
