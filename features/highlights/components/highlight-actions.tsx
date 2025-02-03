import { Highlight } from '@prisma/client';
import EditHighlight from './edit-highlight';
import FavoriteHighlight from './favorite-highlight';

import DeleteHighlight from '@/features/highlights/components/delete-highlight';
type HighlightActionsProps = {
  highlight: Highlight;
};

const HighlightActions = ({ highlight }: HighlightActionsProps) => {
  const { id, isFavorite } = highlight;

  return (
    <div className="flex items-center">
      <FavoriteHighlight id={id} isFavorite={isFavorite} />
      <div className="flex items-center gap-4">
        <EditHighlight id={id} content={highlight.content} />
        <DeleteHighlight id={id} />
      </div>
    </div>
  );
};

export default HighlightActions;
