import { InsertBook } from '@/db/schema';

const createURL = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  return baseUrl + path;
};

export const createNewBook = async (book: InsertBook) => {
  console.log('createnewbook');
  console.log({ book });
  console.log('----------');
  const res = await fetch(
    new Request(createURL('/api/book'), {
      method: 'POST',
      body: JSON.stringify(book),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
