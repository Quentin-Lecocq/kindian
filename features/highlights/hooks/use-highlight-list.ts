import { startTransition, useOptimistic } from 'react';
import { useCreateNoteHighlight } from '../../notes/hooks/use-create-note';
import { useHighlightMutations } from './use-highlight-mutations';
import { useHighlightQueries } from './use-highlight-queries';

export const useHighlightList = () => {
  const { mutate: createNoteHighlight } = useCreateNoteHighlight();
  const { highlights, isLoading, error } = useHighlightQueries();
  const {
    favoriteHighlight,
    editHighlight,
    createSubHighlight,
    createTag,
    deleteTag,
    deleteHighlight,
    deleteSubHighlight,
  } = useHighlightMutations();

  const [optimisticHighlights, addOptimisticHighlight] = useOptimistic(
    highlights,
    (state, { id, isFavorite }: { id: string; isFavorite: boolean }) =>
      state?.map((highlight) =>
        highlight.id === id ? { ...highlight, isFavorite } : highlight
      )
  );

  const handleFavoriteHighlight = (id: string, currentValue: boolean) => {
    startTransition(() => {
      addOptimisticHighlight({ id, isFavorite: !currentValue });
    });
    favoriteHighlight({ highlightId: id, value: !currentValue });
  };

  const handlers = {
    onFavoriteToggle: handleFavoriteHighlight,
    onNoteCreate: (highlightId: string, content: string) => {
      createNoteHighlight({ highlightId, content });
    },
    onEdit: (id: string, newContent: string) => {
      editHighlight({ id, content: newContent });
    },
    onDelete: deleteHighlight,
    onSubHighlightCreate: (
      highlightId: string,
      startIndex: number,
      endIndex: number
    ) => {
      createSubHighlight({ highlightId, startIndex, endIndex });
    },
    onSubHighlightDelete: (id: string) => {
      deleteSubHighlight(id);
    },
    onTagCreate: (highlightId: string, content: string) => {
      createTag({ highlightId, content });
    },
    onDeleteHighlightTag: (highlightId: string, tagId: string) => {
      deleteTag({ highlightId, tagId });
    },
  };

  return {
    highlights: optimisticHighlights,
    isLoading,
    error,
    handlers,
  };
};
