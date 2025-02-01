import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createSubhighlight } from '../api/create-subhighlight';

export const useCreateSubHighlight = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({
      highlightId,
      startIndex,
      endIndex,
    }: {
      highlightId: string;
      startIndex: number;
      endIndex: number;
    }) => createSubhighlight(highlightId, startIndex, endIndex),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['highlights'] }).then(() => {
        toast({
          title: 'Subhighlight created',
          description: 'Subhighlight created successfully',
        });
      });
    },
    onError: () => {
      toast({
        title: 'Failed to create subhighlight',
        description: 'Failed to create subhighlight',
      });
    },
  });
};
