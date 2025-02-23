import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

const RandomBooks = async () => {
  const books = await getRandomBooks(3);

  return (
    <div className="mt-8">
      <h2 className="font-regular mb-8 underline">Random books</h2>
      <div className="flex flex-col gap-4">
        {books.map(({ id, title, author }) => (
          <Card key={id} className="rounded-sm">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{author}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RandomBooks;

const getRandomBooks = async (number: number) => {
  const books = await prisma.book.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: number,
  });

  return books;
};
