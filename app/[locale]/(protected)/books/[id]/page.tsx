import GoBackBtn from '@/components/buttons/go-back-btn';
import BookDetails from '@/features/books/components/book-details';

type BookPageProps = {
  params: { id: string };
};

const BookPage = async ({ params }: BookPageProps) => {
  const { id } = await params;

  return (
    <div>
      <GoBackBtn />
      <BookDetails bookId={id} />
    </div>
  );
};

export default BookPage;
