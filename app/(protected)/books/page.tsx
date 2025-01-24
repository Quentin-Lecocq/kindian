import TypographyH4 from '@/components/typography/typography-h4';
import BooksList from '@/features/books/components/books-list';
import { NextPage } from 'next';

const BooksPage: NextPage = async () => {
  return (
    <div>
      <TypographyH4>Books</TypographyH4>
      <BooksList />
    </div>
  );
};

export default BooksPage;
