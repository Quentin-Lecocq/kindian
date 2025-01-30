import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useToast } from '@/hooks/use-toast';
import { favoriteHighlight } from '../api/favorite-highlight';

export const useFavoriteHighlight = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      highlightId,
      value,
    }: {
      highlightId: string;
      value: boolean;
    }) => favoriteHighlight(highlightId, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['highlights'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'An error occurred while favoriting the highlight',
      });
    },
  });
};
