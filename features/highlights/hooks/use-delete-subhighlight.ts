import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSubhighlight } from '../api/delete-subhighlight';
import { HighlightWithNotesAndSubHighlights } from '../utils/types';

export const useDeleteSubhighlight = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSubhighlight,
    onMutate: async (subhighlightId) => {
      await queryClient.cancelQueries({ queryKey: ['highlights'] });
      const previousHighlights = queryClient.getQueryData<
        HighlightWithNotesAndSubHighlights[]
      >(['highlights']);

      queryClient.setQueryData<HighlightWithNotesAndSubHighlights[]>(
        ['highlights'],
        (old = []) => old.filter(({ id }) => id !== subhighlightId)
      );

      return { previousHighlights };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['highlights'] }).then(() => {
        toast({
          title: 'Subhighlight deleted',
          description: 'Subhighlight has been deleted',
        });
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete subhighlight',
        variant: 'destructive',
      });
    },
  });
};
