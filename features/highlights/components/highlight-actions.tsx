'use client';

import DeleteHighlight from '@/features/highlights/components/delete-highlight';
import { Highlight } from '@prisma/client';
import {
  useDeleteHighlight,
  useEditHighlight,
  useFavoriteHighlight,
} from '../hooks/use-highlights';
import EditHighlight from './edit-highlight';
import FavoriteHighlight from './favorite-highlight';
type HighlightActionsProps = {
  highlight: Highlight;
};

const HighlightActions = ({ highlight }: HighlightActionsProps) => {
  const { id, isFavorite } = highlight;

  const { mutate: favoriteHighlight } = useFavoriteHighlight();
  const { mutate: editHighlight } = useEditHighlight();
  const { mutate: deleteHighlight } = useDeleteHighlight();

  return (
    <div className="flex items-center">
      <FavoriteHighlight
        onFavorite={() => favoriteHighlight({ id, isFavorite: !isFavorite })}
        isFavorite={isFavorite}
      />
      <div className="flex items-center gap-4">
        <EditHighlight
          onEdit={(content) => editHighlight({ id, content })}
          content={highlight.content}
        />
        <DeleteHighlight onDelete={() => deleteHighlight({ id })} />
      </div>
    </div>
  );
};

export default HighlightActions;
