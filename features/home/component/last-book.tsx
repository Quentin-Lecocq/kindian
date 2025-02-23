import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

const LastBook = async () => {
  const lastBook = await getLastBook();

  if (!lastBook) return null;

  const { title, author, pageCount, description } = lastBook;

  return (
    <div>
      <h2 className="font-regular underline mb-8">Your last book</h2>
      <Card className="rounded-sm">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p className="text-muted-foreground text-sm">
            {author} - {pageCount} pages
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm mt-4 text-foreground">
            {description?.slice(0, 400)}...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LastBook;

const getLastBook = async () => {
  const lastBook = await prisma.book.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return lastBook;
};
