import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookDetails } from '../api/get-book-details';

export const useBookDetails = (bookId: string) => {
  return useQuery({
    queryKey: ['book', bookId],
    queryFn: () => getBookDetails(bookId),
  });
};

export const usePrefetchBook = () => {
  const queryClient = useQueryClient();

  return (bookId: string) => {
    queryClient.prefetchQuery({
      queryKey: ['book', bookId],
      queryFn: () => getBookDetails(bookId),
    });
  };
};
