import CreateNoteIcon from '@/features/notes/components/create-note-icon';
import { ICON_SIZE } from '@/features/notes/utils/constants';
import { Copy, Highlighter } from 'lucide-react';
import { ICON_CLASSNAME } from '../utils/constants';
import { HighlightWithNotes } from '../utils/types';
import DeleteHighlightIcon from './delete-highlight-icon';
import EditHighlightIcon from './edit-highlight-icon';
import FavoriteHighlightIcon from './favorite-highlight-icon';

type HighlightActionsFooterProps = {
  highlight: HighlightWithNotes;
  onFavorite: (highlightId: string, isFavorite: boolean) => void;
  onNoteCreate: (highlightId: string, content: string) => void;
  onDelete: (highlightId: string) => void;
  onEdit: (id: string, newContent: string) => void;
};

const HighlightActionsFooter = ({
  highlight,
  onFavorite,
  onNoteCreate,
  onDelete,
  onEdit,
}: HighlightActionsFooterProps) => {
  const { id, isFavorite, location } = highlight;

  return (
    <div className="flex gap-3 mt-3 items-center border">
      <FavoriteHighlightIcon
        isFavorite={isFavorite}
        onToggle={() => onFavorite(id, isFavorite)}
      />
      <p className="text-sm text-muted-foreground ml-[-10px]">{location}</p>
      <Highlighter
        height={ICON_SIZE}
        width={ICON_SIZE}
        className={ICON_CLASSNAME}
      />
      <EditHighlightIcon
        content={highlight.content}
        onEdit={(content) => {
          onEdit(id, content);
        }}
      />
      <CreateNoteIcon
        onCreate={(content) => {
          onNoteCreate(id, content);
        }}
      />
      <DeleteHighlightIcon onDelete={() => onDelete(id)} />
      <Copy height={ICON_SIZE} width={ICON_SIZE} className={ICON_CLASSNAME} />
    </div>
  );
};

export default HighlightActionsFooter;
