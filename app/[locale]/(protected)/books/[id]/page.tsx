import GoBackBtn from '@/components/buttons/go-back-btn';
import BookDetails from '@/features/books/components/book-details';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { cache } from 'react';

type BookPageProps = {
  params: { id: string };
};

const getBook = cache(async (id: string) => {
  const book = await prisma.book.findUnique({
    where: { id },
  });

  if (!book) notFound();
  return book;
});

const BookPage = async ({ params }: BookPageProps) => {
  const { id } = await params;
  const book = await getBook(id);

  return (
    <div>
      <GoBackBtn />
      <BookDetails book={book} />
    </div>
  );
};

export default BookPage;
