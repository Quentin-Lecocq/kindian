import TypographyH4 from '@/components/typography/typography-h4';
import BooksList from '@/features/books/components/books-list';
import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const BooksPage: NextPage = async () => {
  const t = await getScopedI18n('books_page');

  return (
    <div>
      <TypographyH4>{t('title')}</TypographyH4>
      <BooksList />
    </div>
  );
};

export default BooksPage;
