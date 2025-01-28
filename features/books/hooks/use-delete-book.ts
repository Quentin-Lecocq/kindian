import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBook } from '../api/delete-book';
import { Book } from '../types/types';

export const useDeleteBook = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBook,
    onMutate: async (bookId) => {
      await queryClient.cancelQueries({ queryKey: ['books'] });
      const previousBooks = queryClient.getQueryData<Book[]>(['books']);

      queryClient.setQueryData<Book[]>(['books'], (old = []) =>
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
};
