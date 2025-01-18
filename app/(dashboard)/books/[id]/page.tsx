import TypographyH4 from '@/components/typography/typography-h4';
import { db } from '@/db';
import { InsertBook } from '@/db/schema';
import { getUserByClerkId } from '@/utils/auth';
import { and, eq } from 'drizzle-orm';

const getBook = async (id: string): Promise<InsertBook | undefined> => {
  const user = await getUserByClerkId();

  try {
    const book = await db.query.BooksTable.findFirst({
      where: (books) => and(eq(books.id, id), eq(books.userId, user.id)),
    });
    return book;
  } catch (error) {
    console.error('Error fetching book', error);
    return undefined;
  }
};

const BookPage = async ({ params }: { params: { id: string } }) => {
  const book = await getBook(params.id);

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div>
      <TypographyH4>Book: {book.title}</TypographyH4>
    </div>
  );
};

export default BookPage;
