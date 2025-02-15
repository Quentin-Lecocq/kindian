import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  favoriteHighlight,
  getHighlights,
  PaginatedHighlights,
} from '../actions/highlights';

export const HIGHLIGHTS_QUERY_KEY = ['highlights'];

export function useHighlights(initialData: PaginatedHighlights) {
  return useInfiniteQuery({
    queryKey: HIGHLIGHTS_QUERY_KEY,
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getHighlights(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: {
      pages: [initialData],
      pageParams: [undefined],
    },
  });
}

type HighlightsInfiniteData = InfiniteData<PaginatedHighlights>;

export function useFavoriteHighlight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isFavorite }: { id: string; isFavorite: boolean }) =>
      favoriteHighlight(id, isFavorite),
    onMutate: async ({ id, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: HIGHLIGHTS_QUERY_KEY });

      const previousData =
        queryClient.getQueryData<HighlightsInfiniteData>(HIGHLIGHTS_QUERY_KEY);

      queryClient.setQueryData<HighlightsInfiniteData>(
        HIGHLIGHTS_QUERY_KEY,
        (old) => {
          if (!old) return old;

          return {
            pageParams: old.pageParams,
            pages: old.pages.map((page) => ({
              ...page,
              highlights: page.highlights.map((highlight) =>
                highlight.id === id ? { ...highlight, isFavorite } : highlight
              ),
            })),
          };
        }
      );

      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<HighlightsInfiniteData>(
          HIGHLIGHTS_QUERY_KEY,
          context.previousData
        );
      }
    },
  });
}
