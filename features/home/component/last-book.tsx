import { prisma } from '@/lib/prisma';

const LastBook = async () => {
  const lastBook = await getLastBook();

  return (
    <div>
      <h2 className="font-regular mb-8">Your last book</h2>
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold">{lastBook?.title}</h2>
        <p className="text-muted-foreground text-sm">
          {lastBook?.author} - {lastBook?.pageCount} pages
        </p>
        <p className="text-sm mt-4 text-foreground">
          {lastBook?.description?.slice(0, 400)}...
        </p>
      </div>
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
