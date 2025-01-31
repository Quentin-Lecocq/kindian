import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editHighlight } from '../api/edit-highlight';

export const useEditHighlight = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      editHighlight(id, content),
    onSuccess: () => {
      queryClient
        .invalidateQueries({
          queryKey: ['highlights'],
        })
        .then(() => {
          toast({
            title: 'Highlight updated',
            description: 'Highlight has been updated',
          });
        });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to update highlight',
        variant: 'destructive',
      });
    },
  });
};
