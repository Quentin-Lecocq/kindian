import CreateNoteIcon from '@/features/notes/components/create-note-icon';
import { ICON_SIZE } from '@/features/notes/utils/constants';
import { Copy } from 'lucide-react';
import { ICON_CLASSNAME } from '../utils/constants';
import { HighlightWithNotesAndSubHighlightsAndTags } from '../utils/types';
import DeleteHighlightIcon from './delete-highlight-icon';
import EditHighlightIcon from './edit-highlight-icon';
import FavoriteHighlightIcon from './favorite-highlight-icon';
import TagHighlightIcon from './tag-highlight-icon';

type HighlightActionsFooterProps = {
  highlight: HighlightWithNotesAndSubHighlightsAndTags;
  onFavorite: (highlightId: string, isFavorite: boolean) => void;
  onNoteCreate: (highlightId: string, content: string) => void;
  onDelete: (highlightId: string) => void;
  onEdit: (id: string, newContent: string) => void;
  onTagCreate: (id: string, content: string) => void;
};

const HighlightActionsFooter = ({
  highlight,
  onFavorite,
  onNoteCreate,
  onDelete,
  onEdit,
  onTagCreate,
}: HighlightActionsFooterProps) => {
  const { id, isFavorite, location } = highlight;

  return (
    <div className="flex gap-3 items-center">
      <FavoriteHighlightIcon
        isFavorite={isFavorite}
        onToggle={() => onFavorite(id, isFavorite)}
      />
      <p className="text-sm text-muted-foreground ml-[-10px]">{location}</p>
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
      <TagHighlightIcon
        onCreate={(content) => {
          onTagCreate(id, content);
        }}
      />
    </div>
  );
};

export default HighlightActionsFooter;
