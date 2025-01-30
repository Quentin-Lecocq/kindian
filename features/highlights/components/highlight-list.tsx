'use client';

import { useGetHighlights } from '@/features/highlights/hooks/use-get-highlights';
import { startTransition, useOptimistic } from 'react';
import { useCreateNoteHighlight } from '../../notes/hooks/use-create-note';
import { useDeleteHighlight } from '../hooks/use-delete-highlight';
import { useFavoriteHighlight } from '../hooks/use-favorite-highlight';
import HighlightItem from './highlight-item';

const HighlightList = () => {
  // todo: add zustand to store sort params
  const { data: highlights, isLoading, error } = useGetHighlights();
  const { mutate: favoriteHighlight } = useFavoriteHighlight();
  const { mutate: createNoteHighlight } = useCreateNoteHighlight();
  const { mutate: deleteHighlight } = useDeleteHighlight();

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
          />
        ))}
      </div>
    </>
  );
};

export default HighlightList;
