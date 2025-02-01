'use client';

import { useGetHighlights } from '@/features/highlights/hooks/use-get-highlights';
import { startTransition, useOptimistic } from 'react';
import { useCreateNoteHighlight } from '../../notes/hooks/use-create-note';
import { useCreateSubHighlight } from '../hooks/use-create-subhighlight';
import { useDeleteHighlight } from '../hooks/use-delete-highlight';
import { useDeleteSubhighlight } from '../hooks/use-delete-subhighlight';
import { useEditHighlight } from '../hooks/use-edit-highlight';
import { useFavoriteHighlight } from '../hooks/use-favorite-highlight';
import HighlightItem from './highlight-item';

const HighlightList = () => {
  const { data: highlights, isLoading, error } = useGetHighlights();
  const { mutate: favoriteHighlight } = useFavoriteHighlight();
  const { mutate: createNoteHighlight } = useCreateNoteHighlight();
  const { mutate: deleteHighlight } = useDeleteHighlight();
  const { mutate: editHighlight } = useEditHighlight();
  const { mutate: createSubHighlight } = useCreateSubHighlight();
  const { mutate: deleteSubHighlight } = useDeleteSubhighlight();

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

  const handleNoteCreate = (highlightId: string, content: string) => {
    createNoteHighlight({ highlightId, content });
  };

  const handleEditHighlight = (id: string, newContent: string) => {
    editHighlight({ id, content: newContent });
  };

  const handleDeleteSubHighlight = (id: string) => {
    deleteSubHighlight(id);
  };

  const handleSubHighlightCreate = (
    highlightId: string,
    startIndex: number,
    endIndex: number
  ) => {
    createSubHighlight({ highlightId, startIndex, endIndex });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (highlights?.length === 0) return <div>No highlights found</div>;

  return (
    <>
      <div className="flex flex-col gap-10">
        {optimisticHighlights?.map((highlight) => (
          <HighlightItem
            key={highlight.id}
            highlight={highlight}
            onFavoriteToggle={handleFavoriteHighlight}
            onNoteCreate={handleNoteCreate}
            onDelete={deleteHighlight}
            onEdit={handleEditHighlight}
            onSubHighlightCreate={handleSubHighlightCreate}
            onSubHighlightDelete={handleDeleteSubHighlight}
          />
        ))}
      </div>
    </>
  );
};

export default HighlightList;
