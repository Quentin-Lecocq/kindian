import NoteList from '@/features/notes/components/note-list';
import { HighlightWithNotesAndSubHighlights } from '../utils/types';
import HighlightActionsFooter from './highlight-actions-footer';
import HighlightedContent from './highlighted-content';

type HighlightItemProps = {
  highlight: HighlightWithNotesAndSubHighlights;
  onFavoriteToggle: (id: string, isFavorite: boolean) => void;
  onNoteCreate: (highlightId: string, content: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newContent: string) => void;
  onSubHighlightCreate: (
    highlightId: string,
    startIndex: number,
    endIndex: number
  ) => void;
  onSubHighlightDelete: (id: string) => void;
};

const calculateStartIndex = (range: Range): number => {
  const preSelectionRange = range.cloneRange();

  const container = range.startContainer.parentElement;
  if (!container) return 0;

  preSelectionRange.selectNodeContents(container);
  preSelectionRange.setEnd(range.startContainer, range.startOffset);

  return preSelectionRange.toString().length;
};

const HighlightItem = ({
  highlight,
  onFavoriteToggle,
  onNoteCreate,
  onDelete,
  onEdit,
  onSubHighlightCreate,
  onSubHighlightDelete,
}: HighlightItemProps) => {
  const handleMouseUp = (id: string) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const text = selection.toString();

    const startIndex = calculateStartIndex(range);
    const endIndex = startIndex + text.length;

    onSubHighlightCreate(id, startIndex, endIndex);

    selection.removeAllRanges();
  };

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
      <div
        className="cursor-text text-foreground text-sm"
        onMouseUp={() => handleMouseUp(highlight.id)}
      >
        <HighlightedContent
          content={highlight.content}
          subHighlights={highlight.subHighlights}
          onDelete={onSubHighlightDelete}
        />
      </div>
      {highlight.notes.length ? <NoteList notes={highlight.notes} /> : null}
      <HighlightActionsFooter
        highlight={highlight}
        onFavorite={onFavoriteToggle}
        onNoteCreate={onNoteCreate}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </div>
  );
};

export default HighlightItem;
