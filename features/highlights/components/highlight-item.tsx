import CreateNoteIcon from '@/features/notes/components/create-note-icon';
import NoteList from '@/features/notes/components/note-list';
import { Copy, Ellipsis, Highlighter, Pencil, Trash } from 'lucide-react';
import { ICON_SIZE } from '../utils/constants';
import { HighlightWithNotes } from '../utils/types';
import FavoriteHighlightButton from './favorite-highlight-button';

type HighlightItemProps = {
  highlight: HighlightWithNotes;
  onFavoriteToggle: (id: string, isFavorite: boolean) => void;
  onNoteCreate: (highlightId: string, content: string) => void;
};

const HighlightItem = ({
  highlight,
  onFavoriteToggle,
  onNoteCreate,
}: HighlightItemProps) => {
  return (
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
      {highlight.notes.length ? <NoteList notes={highlight.notes} /> : null}

      <div className="flex gap-2 mt-3 items-center">
        <Ellipsis
          height={ICON_SIZE}
          width={ICON_SIZE}
          className="text-muted-foreground"
        />
        <FavoriteHighlightButton
          isFavorite={highlight.isFavorite}
          onToggle={() => onFavoriteToggle(highlight.id, highlight.isFavorite)}
        />
        <p className="text-sm text-muted-foreground">{highlight.location}</p>
        <Highlighter
          height={ICON_SIZE}
          width={ICON_SIZE}
          className="text-muted-foreground"
        />
        <Pencil
          height={ICON_SIZE}
          width={ICON_SIZE}
          className="text-muted-foreground hover:scale-110 hover:text-foreground transition-transform cursor-pointer"
        />
        <CreateNoteIcon
          onCreate={(content) => {
            onNoteCreate(highlight.id, content);
          }}
        />
        <Trash
          height={ICON_SIZE}
          width={ICON_SIZE}
          className="text-muted-foreground"
        />
        <Copy
          height={ICON_SIZE}
          width={ICON_SIZE}
          className="text-muted-foreground"
        />
      </div>
    </div>
  );
};

export default HighlightItem;
