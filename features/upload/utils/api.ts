import { createURL } from '@/utils/api';
import { Book } from '../type';

export const saveBooks = async (books: Book[]) => {
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
