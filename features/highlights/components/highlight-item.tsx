import NoteList from '@/features/notes/components/note-list';
import { HighlightWithNotes } from '../utils/types';
import HighlightActionsFooter from './highlight-actions-footer';

type HighlightItemProps = {
  highlight: HighlightWithNotes;
  onFavoriteToggle: (id: string, isFavorite: boolean) => void;
  onNoteCreate: (highlightId: string, content: string) => void;
  onDelete: (id: string) => void;
};

const HighlightItem = ({
  highlight,
  onFavoriteToggle,
  onNoteCreate,
  onDelete,
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
      <HighlightActionsFooter
        highlight={highlight}
        onFavorite={onFavoriteToggle}
        onNoteCreate={onNoteCreate}
        onDelete={onDelete}
      />
    </div>
  );
};

export default HighlightItem;
