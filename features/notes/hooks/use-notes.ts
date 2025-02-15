import { deleteNote, editNote, NoteResponse } from '../actions/notes';

import { useMutation } from '@tanstack/react-query';

import {
  HIGHLIGHTS_QUERY_KEY,
  HighlightsInfiniteData,
} from '@/features/highlights/hooks/use-highlights';
import { useQueryClient } from '@tanstack/react-query';
import { createNote } from '../actions/notes';

export const useAddNoteToHighlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      createNote(id, { content }),
    onSuccess: (newNote: NoteResponse, { id }) => {
      queryClient.setQueryData<HighlightsInfiniteData>(
        HIGHLIGHTS_QUERY_KEY,
        (old) => {
          if (!old) return old;

          return {
            pageParams: old.pageParams,
            pages: old.pages.map((page) => ({
              ...page,
              highlights: page.highlights.map((highlight) =>
                highlight.id === id
                  ? {
                      ...highlight,
                      notes: [newNote, ...highlight.notes].sort(
                        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
                      ),
                    }
                  : highlight
              ),
            })),
          };
        }
      );
    },
    onError: (error) => {
      console.error('Failed to create note:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: HIGHLIGHTS_QUERY_KEY });
    },
  });
};

export const useDeleteNoteFromHighlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId }: { noteId: string }) => deleteNote(noteId),
    onMutate: async ({ noteId }) => {
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
              highlights: page.highlights.map((highlight) => ({
                ...highlight,
                notes: highlight.notes.filter(({ id }) => id !== noteId),
              })),
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
      console.error('Failed to delete note:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: HIGHLIGHTS_QUERY_KEY });
    },
  });
};
export const useEditNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      editNote(id, { content }),
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
              highlights: page.highlights.map((highlight) => ({
                ...highlight,
                notes: highlight.notes.map((note) =>
                  note.id === id ? { ...note, content } : note
                ),
              })),
            })),
          };
        }
      );

      return { previousData };
    },
    onError: (_, __, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(HIGHLIGHTS_QUERY_KEY, context.previousData);
      }
    },
    onSuccess: (updatedNote, { id }) => {
      queryClient.setQueryData<HighlightsInfiniteData>(
        HIGHLIGHTS_QUERY_KEY,
        (old) => {
          if (!old) return old;

          return {
            pageParams: old.pageParams,
            pages: old.pages.map((page) => ({
              ...page,
              highlights: page.highlights.map((highlight) => ({
                ...highlight,
                notes: highlight.notes.map((note) =>
                  note.id === id ? updatedNote : note
                ),
              })),
            })),
          };
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: HIGHLIGHTS_QUERY_KEY });
    },
  });
};
