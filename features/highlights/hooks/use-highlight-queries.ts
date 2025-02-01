import { useQuery } from '@tanstack/react-query';
import { highlightApi } from '../api/highlight';
import { useSortStore } from '../stores/use-sort-store';
import { HighlightWithNotesAndSubHighlightsAndTags } from '../utils/types';

export const useHighlightQueries = () => {
  const { order, orderBy } = useSortStore();

  const getHighlight = useQuery<HighlightWithNotesAndSubHighlightsAndTags[]>({
    queryKey: ['highlights', order, orderBy],
    queryFn: () => highlightApi.getHighlights({ order, orderBy }),
    staleTime: 1000 * 30,
  });

  return {
    highlights: getHighlight.data,
    isLoading: getHighlight.isLoading,
    error: getHighlight.error,
  };
};
