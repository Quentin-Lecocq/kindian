import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  deleteHighlight,
  editHighlight,
  favoriteHighlight,
  getHighlights,
  PaginatedHighlights,
} from '../actions/highlights';

export const HIGHLIGHTS_QUERY_KEY = ['highlights'];
export type HighlightsInfiniteData = InfiniteData<PaginatedHighlights>;

export const useHighlights = (initialData: PaginatedHighlights) => {
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
};

export const useFavoriteHighlight = () => {
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
};

export const useEditHighlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      editHighlight(id, { content }),
    onMutate: async ({ id, content }) => {
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
                highlight.id === id ? { ...highlight, content } : highlight
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
};

export const useDeleteHighlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deleteHighlight(id),
    onMutate: async ({ id }) => {
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
              highlights: page.highlights.filter(
                (highlight) => highlight.id !== id
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
};
