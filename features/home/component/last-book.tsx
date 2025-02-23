import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';

const LastBook = async () => {
  const lastBook = await getLastBook();

  return (
    <Card className="p-6 rounded-sm">
      <CardHeader>
        <CardTitle>Your last book</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{lastBook?.title}</h2>
          <p className="text-muted-foreground text-sm">
            {lastBook?.author} - {lastBook?.pageCount} pages
          </p>
          <p className="text-sm mt-4 text-foreground">
            {lastBook?.description?.slice(0, 400)}...
          </p>
        </div>
      </CardContent>
    </Card>
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
