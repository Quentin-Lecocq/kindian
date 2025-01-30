import {
  getHighlights,
  GetHighlightsParams,
} from '@/features/highlights/api/get-highlights';
import { useQuery } from '@tanstack/react-query';
import { useSortStore } from '../stores/use-sort-store';
import { HighlightWithNotes } from '../utils/types';

export const useGetHighlights = (params?: GetHighlightsParams) => {
  const { order, orderBy } = useSortStore();

  return useQuery<HighlightWithNotes[]>({
    queryKey: ['highlights', params, order, orderBy],
    queryFn: () => getHighlights({ ...params, order, orderBy }),
    staleTime: 1000 * 30,
  });
};
