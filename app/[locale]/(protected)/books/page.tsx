import BooksList from '@/features/books/components/books-list';
import { prisma } from '@/lib/prisma';
import { getScopedI18n } from '@/locales/server';

const BooksPage = async () => {
  const t = await getScopedI18n('books_page');
  const books = await prisma.book.findMany();

  return (
    <>
      <h2 className="text-xl mb-6">{t('title')}</h2>
      <BooksList books={books} />
    </>
  );
};

export default BooksPage;
