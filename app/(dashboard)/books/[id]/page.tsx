import TypographyH4 from '@/components/typography/typography-h4';
import TypographyP from '@/components/typography/typography-p';
import { getBookDetails } from '@/features/books/api/get-book-details';
import Image from 'next/image';

type BookPageProps = {
  params: { id: string };
};

const BookPage = async ({ params }: BookPageProps) => {
  const { id } = await params;
  const book = await getBookDetails(id);

  if (!book) {
    return <div>Book not found</div>;
  }

  console.log({ book });

  return (
    <div className="border">
      <div className="border flex">
        <div className="w-1/3">
          <Image
            src={book.imageUrl || ''}
            alt={book.title}
            width={200}
            height={100}
          />
        </div>
        <div className="w-2/3">
          <TypographyH4>{book.title}</TypographyH4>
          <TypographyP>{book.author}</TypographyP>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
