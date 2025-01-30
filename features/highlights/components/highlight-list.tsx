'use client';

import { useGetHighlights } from '@/features/highlights/hooks/use-get-highlights';
import CreateNoteIcon from '@/features/notes/components/create-note-icon';
import NoteList from '@/features/notes/components/note-list';
import { Copy, Ellipsis, Highlighter, Pencil, Trash } from 'lucide-react';
import { startTransition, useOptimistic, useState } from 'react';
import { useCreateNoteHighlight } from '../../notes/hooks/use-create-note';
import { GetHighlightsParams } from '../api/get-highlights';
import { useFavoriteHighlight } from '../hooks/use-favorite-highlight';
import FavoriteHighlightButton from './favorite-highlight-button';
import SortControls from './sort-controls';

const HighlightList = () => {
  const [sortParams, setSortParams] = useState<GetHighlightsParams>({
    orderBy: 'addedAt',
    order: 'desc',
  });
  // todo: add zustand to store sort params
  const { data: highlights, isLoading, error } = useGetHighlights();
  const { mutate: favoriteHighlight } = useFavoriteHighlight();
  const { mutate: createNoteHighlight } = useCreateNoteHighlight();

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (highlights?.length === 0) return <div>No highlights found</div>;

  return (
    <>
      <SortControls sortParams={sortParams} setSortParams={setSortParams} />
      <div className="flex flex-col gap-10">
        {optimisticHighlights?.map((highlight) => (
          <div
            key={highlight.id}
            className="text-foreground border-b border-border py-4"
          >
            <h3 className="text-lg font-medium mb-2">
              {highlight.bookTitle}{' '}
              <span className="text-muted-foreground text-sm">
                by {highlight.bookAuthor}
              </span>
            </h3>
            <p className="text-sm text-foreground">{highlight.content}</p>
            {highlight.notes.length ? (
              <div className="flex flex-col my-3">
                <div className="border-b w-full">
                  <h4 className="text-sm font-light text-muted-foreground">
                    Notes
                  </h4>
                </div>
                <NoteList notes={highlight.notes} />
              </div>
            ) : null}

            <div className="flex gap-2 mt-3 items-center">
              <Ellipsis
                height={16}
                width={16}
                className="text-muted-foreground"
              />
              <FavoriteHighlightButton
                isFavorite={highlight.isFavorite}
                onToggle={() =>
                  handleFavoriteHighlight(highlight.id, highlight.isFavorite)
                }
              />
              <p className="text-sm text-muted-foreground">
                {highlight.location}
              </p>
              <Highlighter
                height={16}
                width={16}
                className="text-muted-foreground"
              />
              <Pencil
                height={16}
                width={16}
                className="text-muted-foreground hover:scale-110 hover:text-foreground transition-transform cursor-pointer"
              />
              <CreateNoteIcon
                onCreate={(content) => {
                  createNoteHighlight({
                    highlightId: highlight.id,
                    content,
                  });
                }}
              />
              <Trash height={16} width={16} className="text-muted-foreground" />
              <Copy height={16} width={16} className="text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HighlightList;
