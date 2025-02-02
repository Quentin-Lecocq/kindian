import { Highlight } from '@prisma/client';

type HighlightActionsFooterProps = {
  highlight: Highlight;
  // onFavorite: (highlightId: string, isFavorite: boolean) => void;
  // onDelete: (highlightId: string) => void;
  // onEdit: (id: string, newContent: string) => void;
  // onTagCreate: (id: string, content: string) => void;
};

const HighlightActionsFooter = ({
  highlight,
}: // onFavorite,
// onDelete,
// onEdit,
// onTagCreate,
HighlightActionsFooterProps) => {
  const { id, isFavorite, location } = highlight;

  return (
    <div className="flex gap-3 items-center">
      {/* <FavoriteHighlightIcon
        isFavorite={isFavorite}
        onToggle={() => onFavorite(id, isFavorite)}
      /> */}
      <p className="text-sm text-muted-foreground ml-[-10px]">{location}</p>
      {/* <EditHighlightIcon
        content={highlight.content}
        onEdit={(content) => {
          onEdit(id, content);
        }}
      /> */}
      {/* <DeleteHighlightIcon onDelete={() => onDelete(id)} /> */}
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
