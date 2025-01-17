import TypographyH4 from '@/components/typography/typography-h4';
import BooksList from '@/features/books/components/books-list';

export default async function BooksPage() {
  return (
    <div>
      <TypographyH4>Books</TypographyH4>
      <BooksList />
    </div>
  );
}
