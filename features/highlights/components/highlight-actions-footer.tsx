import DeleteHighlightIcon from '@/features/highlights/components/delete-highlight-icon';
import { Highlight } from '@prisma/client';
import EditHighlightIcon from './edit-highlight-icon';
import FavoriteHighlightIcon from './favorite-highlight-icon';

type HighlightActionsFooterProps = {
  highlight: Highlight;
};

const HighlightActionsFooter = ({ highlight }: HighlightActionsFooterProps) => {
  const { id, isFavorite, location } = highlight;

  return (
    <div className="flex gap-3 items-center">
      <FavoriteHighlightIcon id={id} isFavorite={isFavorite} />
      <p className="text-sm text-muted-foreground ml-[-10px]">{location}</p>
      <EditHighlightIcon id={id} content={highlight.content} />
      <DeleteHighlightIcon id={id} />
      {/* <Copy height={ICON_SIZE} width={ICON_SIZE} className={ICON_CLASSNAME} /> */}
      {/* <TagHighlightIcon
        onCreate={(content) => {
          onTagCreate(id, content);
        }} */}
      {/* /> */}
    </div>
  );
};

export default HighlightActionsFooter;
