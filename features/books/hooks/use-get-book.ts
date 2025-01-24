import { useQuery } from '@tanstack/react-query';
import { getBook } from '../api/get-book';

export const useGetBook = (bookId: string) => {
  return useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBook(bookId),
    enabled: !!bookId,
  });
};
