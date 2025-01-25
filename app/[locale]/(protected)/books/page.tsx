import BooksList from '@/features/books/components/books-list';
import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const BooksPage: NextPage = async () => {
  const t = await getScopedI18n('books_page');

  return (
    <div>
      <h1 className="text-2xl">{t('title')}</h1>
      <BooksList />
    </div>
  );
};

export default BooksPage;
