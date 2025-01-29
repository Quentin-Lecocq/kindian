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
    onSuccess: (_, { value }) => {
      queryClient.invalidateQueries({ queryKey: ['highlights'] });
      toast({
        title: value ? 'Added to favorites' : 'Removed from favorites',
        description: value
          ? 'The highlight has been added to your favorites'
          : 'The highlight has been removed from your favorites',
      });
    },
  });
};
