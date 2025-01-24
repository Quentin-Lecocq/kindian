import { useQueryClient } from '@tanstack/react-query';
import { getBook } from '../api/get-book';

export const usePrefetchGetBook = () => {
  const queryClient = useQueryClient();

  return (bookId: string) => {
    queryClient.prefetchQuery({
      queryKey: ['book', bookId],
      queryFn: () => getBook(bookId),
    });
  };
};
