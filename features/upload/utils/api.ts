import { InsertBook } from '@/db/schema';

export const createURL = (path: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  return baseUrl + path;
};

export const saveBooks = async (books: InsertBook[]) => {
  const res = await fetch(
    new Request(createURL('/api/book'), {
      method: 'POST',
      body: JSON.stringify(books),
    })
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};
