import { db } from '@/db';
import { BooksTable } from '@/db/schema';
import DeleteBookBtn from '@/features/books/components/delete-book-btn';
import { getUserByClerkId } from '@/utils/auth';
import { desc, eq } from 'drizzle-orm';
import { NextPage } from 'next';

const getBooks = async () => {
  const { id } = await getUserByClerkId();
  const books = await db
    .select()
    .from(BooksTable)
    .where(eq(BooksTable.userId, id))
    .orderBy(desc(BooksTable.createdAt));
  return books;
};

const BooksPage: NextPage = async () => {
  const books = await getBooks();

  return (
    <>
      <h1>Books</h1>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {books.map(({ id, title, author, highlightsCount }) => (
          <div className="border h-32" key={id}>
            <h3 className="text-lg font-bold">{title}</h3>
            <div className="flex gap-2">
              <span className="text-sm text-gray-500">{author}</span>
              <span className="text-sm text-gray-500">
                {highlightsCount} highlights
              </span>
            </div>
            <DeleteBookBtn bookId={id} />
          </div>
        ))}
      </div>
    </>
  );
};

export default BooksPage;
