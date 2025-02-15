import {
  HIGHLIGHTS_QUERY_KEY,
  HighlightsInfiniteData,
} from '@/features/highlights/hooks/use-highlights';
import { HighlightTag, Tag } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHighlightTag, deleteHighlightTag } from '../actions/tags';

type HighlightTagWithTag = HighlightTag & {
  tag: Tag;
};

export const useAddTagToHighlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      highlightId,
      name,
    }: {
      highlightId: string;
      name: string;
    }) => createHighlightTag(highlightId, { name }),
    onSuccess: (newHighlightTag: HighlightTagWithTag, { highlightId }) => {
      queryClient.setQueryData<HighlightsInfiniteData>(
        HIGHLIGHTS_QUERY_KEY,
        (old) => {
          if (!old) return old;

          return {
            pageParams: old.pageParams,
            pages: old.pages.map((page) => ({
              ...page,
              highlights: page.highlights.map((highlight) =>
                highlight.id === highlightId
                  ? {
                      ...highlight,
                      highlightTags: [
                        ...highlight.highlightTags,
                        newHighlightTag,
                      ],
                    }
                  : highlight
              ),
            })),
          };
        }
      );
    },
    onError: (error) => {
      console.error('Failed to create tag:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: HIGHLIGHTS_QUERY_KEY });
    },
  });
};

export const useDeleteTagFromHighlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      highlightId,
      tagId,
    }: {
      highlightId: string;
      tagId: string;
    }) => deleteHighlightTag(highlightId, tagId),
    onMutate: async ({ highlightId, tagId }) => {
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
                highlight.id === highlightId
                  ? {
                      ...highlight,
                      highlightTags: highlight.highlightTags.filter(
                        (tag) => tag.tagId !== tagId
                      ),
                    }
                  : highlight
              ),
            })),
          };
        }
      );

      return { previousData };
    },

    onError: (error, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(HIGHLIGHTS_QUERY_KEY, context.previousData);
      }
      console.error('Failed to delete tag:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: HIGHLIGHTS_QUERY_KEY });
    },
  });
};
