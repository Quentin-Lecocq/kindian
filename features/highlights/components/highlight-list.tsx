'use client';

import { Button } from '@/components/ui/button';
import { useGetHighlights } from '@/features/highlights/hooks/use-get-highlights';
import CreateNoteIcon from '@/features/notes/components/create-note-icon';
import NoteList from '@/features/notes/components/note-list';
import {
  Copy,
  Ellipsis,
  Heart,
  Highlighter,
  Pencil,
  SortAsc,
  SortDesc,
  Trash,
} from 'lucide-react';
import { useState } from 'react';
import { useCreateNoteHighlight } from '../../notes/hooks/use-create-note';
import { GetHighlightsParams } from '../api/get-highlights';
import { useFavoriteHighlight } from '../hooks/use-favorite-highlight';

const HighlightList = () => {
  const [sortParams, setSortParams] = useState<GetHighlightsParams>({
    orderBy: 'addedAt',
    order: 'desc',
  });

  const { data, isLoading, error } = useGetHighlights(sortParams);
  const { mutate: favoriteHighlight } = useFavoriteHighlight();
  const { mutate: createNoteHighlight } = useCreateNoteHighlight();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data?.length === 0) return <div>No highlights found</div>;

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <Button
            onClick={() => setSortParams({ ...sortParams, order: 'asc' })}
            variant="outline"
          >
            <SortAsc height={16} width={16} className="text-muted-foreground" />
          </Button>
          <Button
            onClick={() => setSortParams({ ...sortParams, order: 'desc' })}
            variant="outline"
          >
            <SortDesc
              height={16}
              width={16}
              className="text-muted-foreground"
            />
          </Button>
          <Button
            disabled={sortParams.orderBy === 'addedAt'}
            onClick={() => setSortParams({ ...sortParams, orderBy: 'addedAt' })}
            variant="outline"
          >
            AddedAt
          </Button>
          <Button
            disabled={sortParams.orderBy === 'isFavorite'}
            onClick={() =>
              setSortParams({ ...sortParams, orderBy: 'isFavorite' })
            }
            variant="outline"
          >
            Favorite
          </Button>
        </div>

        {data?.map((highlight) => (
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
              <Heart
                fill={highlight.isFavorite ? 'currentColor' : 'none'}
                onClick={() =>
                  favoriteHighlight({
                    highlightId: highlight.id,
                    value: !highlight.isFavorite,
                  })
                }
                height={16}
                width={16}
                className="cursor-pointer text-muted-foreground"
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
                className="text-muted-foreground"
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
