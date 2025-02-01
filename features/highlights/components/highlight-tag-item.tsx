import { TrashIcon } from 'lucide-react';
import { Tag } from '../utils/types';

type HighlightTagItemProps = {
  tag: Tag;
  onDelete: (id: string) => void;
};

const HighlightTagItem = ({ tag, onDelete }: HighlightTagItemProps) => {
  const { id, name } = tag;

  return (
    <div
      className="flex text-background items-center gap-1 text-xs bg-neutral-300 px-1 py-1"
      key={id}
    >
      {name}
      <TrashIcon
        className="w-3 h-3 cursor-pointer"
        onClick={() => onDelete(id)}
      />
    </div>
  );
};

export default HighlightTagItem;
