import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHighlight } from '../api/delete-highlight';
import { HighlightWithNotes } from '../utils/types';

export const useDeleteHighlight = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteHighlight,
    onMutate: async (highlightId) => {
      await queryClient.cancelQueries({ queryKey: ['highlights'] });
      const previousHighlights = queryClient.getQueryData<HighlightWithNotes[]>(
        ['highlights']
      );

      queryClient.setQueryData<HighlightWithNotes[]>(
        ['highlights'],
        (old = []) => old.filter(({ id }) => id !== highlightId)
      );

      return { previousHighlights };
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['highlights'],
        })
        .then(() => {
          toast({
            title: 'Highlight deleted',
            description: 'Highlight has been deleted',
          });
        });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete highlight',
        variant: 'destructive',
      });
    },
  });
};
