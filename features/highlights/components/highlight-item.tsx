import NoteList from '@/features/notes/components/note-list';
import { HighlightWithNotesAndSubHighlightsAndTags } from '../utils/types';
import HighlightActionsFooter from './highlight-actions-footer';
import HighlightTags from './highlight-tags';
import HighlightedContent from './highlighted-content';

type HighlightItemProps = {
  highlight: HighlightWithNotesAndSubHighlightsAndTags;
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
  onTagCreate: (id: string, content: string) => void;
  onDeleteHighlightTag: (highlightId: string, tagId: string) => void;
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
  onTagCreate,
  onDeleteHighlightTag,
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
      <div className="flex mt-3 gap-4">
        <HighlightActionsFooter
          highlight={highlight}
          onFavorite={onFavoriteToggle}
          onNoteCreate={onNoteCreate}
          onDelete={onDelete}
          onEdit={onEdit}
          onTagCreate={onTagCreate}
        />
        <div className="flex items-center gap-2"></div>
        <HighlightTags
          tags={highlight.highlightTags}
          onDelete={(tagId) => onDeleteHighlightTag(highlight.id, tagId)}
        />
      </div>
    </div>
  );
};

export default HighlightItem;
