import { HighlightWithNotes } from '@/features/highlights/utils/types';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNoteHighlight } from '../api/delete-note-highlight';

export const useDeleteNote = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNoteHighlight,
    onMutate: async (noteId) => {
      await queryClient.cancelQueries({ queryKey: ['highlights'] });
      const previousNotes = queryClient.getQueryData<HighlightWithNotes[]>([
        'highlights',
      ]);

      queryClient.setQueryData<HighlightWithNotes[]>(
        ['highlights'],
        (old = []) => old.filter(({ id }) => id !== noteId)
      );

      return { previousNotes };
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['highlights'],
        })
        .then(() => {
          toast({
            title: 'Note deleted',
            description: 'Note has been deleted',
          });
        });
    },
    onError: (_, __, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(['highlights'], context.previousNotes);
      }
      toast({
        title: 'Error',
        description: 'Failed to delete note',
        variant: 'destructive',
      });
    },
  });
};
