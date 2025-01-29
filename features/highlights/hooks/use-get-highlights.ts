import {
  getHighlights,
  GetHighlightsParams,
} from '@/features/highlights/api/get-highlights';
import { useQuery } from '@tanstack/react-query';

export const useGetHighlights = (params?: GetHighlightsParams) => {
  return useQuery({
    queryKey: ['highlights', params],
    queryFn: () => getHighlights(params),
  });
};
