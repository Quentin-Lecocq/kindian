import TypographyH4 from '@/components/typography/typography-h4';
import { NextPage } from 'next';

const BooksPage: NextPage = async () => {
  // const t = await getI18n();

  return (
    <div>
      <TypographyH4>Books</TypographyH4>
      {/* <BooksList /> */}
    </div>
  );
};

export default BooksPage;
