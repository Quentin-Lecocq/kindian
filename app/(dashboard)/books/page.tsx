import BooksList from '@/features/books/components/books-list';

export default async function BooksPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Books</h1>
      <BooksList /> {/* Passer les données initiales */}
    </div>
  );
}
