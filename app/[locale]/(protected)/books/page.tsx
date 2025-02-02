import BooksList from '@/features/books/components/books-list';
import { prisma } from '@/lib/prisma';
import { getScopedI18n } from '@/locales/server';

const getBooks = async () => {
  try {
    const books = await prisma.book.findMany();
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
};

const BooksPage = async () => {
  const t = await getScopedI18n('books_page');
  const books = await getBooks();

  return (
    <>
      <h2 className="text-xl mb-6">{t('title')}</h2>
      <BooksList books={books} />
    </>
  );
};

export default BooksPage;
