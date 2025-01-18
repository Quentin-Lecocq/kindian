import TypographyH4 from '@/components/typography/typography-h4';
import { getBookDetails } from '@/features/books/api/get-book-details';

type BookPageProps = {
  params: { id: string };
};

const BookPage = async ({ params }: BookPageProps) => {
  const { id } = await params;
  const book = await getBookDetails(id);

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <TypographyH4>Book: {book.title}</TypographyH4>
    </div>
  );
};

export default BookPage;
