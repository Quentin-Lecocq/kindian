import TypographyH4 from '@/components/typography/typography-h4';
import BooksList from '@/features/books/components/books-list';
import { getI18n } from '@/locales/server';
import { NextPage } from 'next';

const BooksPage: NextPage = async () => {
  const t = await getI18n();

  return (
    <div>
      <TypographyH4>{t('books_page.title')}</TypographyH4>
      <BooksList />
    </div>
  );
};

export default BooksPage;
