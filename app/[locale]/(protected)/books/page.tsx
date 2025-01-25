import BooksList from '@/features/books/components/books-list';
import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const BooksPage: NextPage = async () => {
  const t = await getScopedI18n('books_page');

  return (
    <>
      <h2 className="text-xl mb-6">{t('title')}</h2>
      <BooksList />
    </>
  );
};

export default BooksPage;
