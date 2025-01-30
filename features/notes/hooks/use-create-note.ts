import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNoteHighlight } from '../api/create-note-highlight';

export const useCreateNoteHighlight = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      highlightId,
      content,
    }: {
      highlightId: string;
      content: string;
    }) => createNoteHighlight(highlightId, content),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['highlights'],
        })
        .then(() => {
          toast({
            title: 'Note created',
            description: 'The note has been created',
          });
        });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred while creating the note',
      });
    },
  });
};
