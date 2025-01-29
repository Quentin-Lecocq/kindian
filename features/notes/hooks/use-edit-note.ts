import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editNoteHighlight } from '../api/edit-note-highlight';

export const useEditNote = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      editNoteHighlight(id, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['highlights'] }).then(() => {
        toast({
          title: 'Note updated',
          description: 'Note has been updated',
        });
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update note',
        variant: 'destructive',
      });
    },
  });
};
