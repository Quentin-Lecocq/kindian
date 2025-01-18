import GoBackBtn from '@/components/go-back-btn';
import { getBookDetails } from '@/features/books/api/get-book-details';
import BookDetails from '@/features/books/components/book-details';

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
      <GoBackBtn />
      <BookDetails book={book} />
    </div>
  );
};

export default BookPage;
