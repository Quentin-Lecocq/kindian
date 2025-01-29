import {
  getHighlights,
  GetHighlightsParams,
} from '@/features/highlights/api/get-highlights';
import { useQuery } from '@tanstack/react-query';
import { HighlightWithNotes } from '../types/types';

export const useGetHighlights = (params?: GetHighlightsParams) => {
  return useQuery<HighlightWithNotes[]>({
    queryKey: ['highlights', params],
    queryFn: () => getHighlights(params),
    staleTime: 1000 * 30,
  });
};
