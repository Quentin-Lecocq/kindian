import { deleteBook, getBooks } from '@/features/books/api/books';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useBooks = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: books = [], isLoading } = useQuery<any[]>({
    queryKey: ['books'],
    queryFn: getBooks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onMutate: async (bookId) => {
      await queryClient.cancelQueries({ queryKey: ['books'] });
      const previousBooks = queryClient.getQueryData<any[]>(['books']);

      queryClient.setQueryData<any[]>(['books'], (old = []) =>
        old.filter(({ id }) => id !== bookId)
      );

      return { previousBooks };
    },
    onError: (_, __, context) => {
      if (context?.previousBooks) {
        queryClient.setQueryData(['books'], context.previousBooks);
      }
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Failed to delete book',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
    onSuccess: () => {
      toast({
        title: 'Book deleted',
        description: 'The book has been deleted',
      });
    },
  });

  return {
    books,
    isLoading,
    deleteBook: deleteMutation.mutate,
  };
};
