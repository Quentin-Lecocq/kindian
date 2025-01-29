import { getBooks } from '@/features/books/api/get-books';
import { useQuery } from '@tanstack/react-query';

export const useGetBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: getBooks,
    staleTime: 1000 * 60,
  });
};
