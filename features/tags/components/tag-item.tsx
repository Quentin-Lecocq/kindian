import { Tag } from '@prisma/client';
import DeleteTag from './delete-tag';

type TagItemProps = {
  tag: Tag;
  highlightId: string;
  onOptimisticDelete: (tag: Tag) => void;
};

const TagItem = ({ tag, highlightId, onOptimisticDelete }: TagItemProps) => {
  const { id, name } = tag;
  return (
    <div className="bg-neutral-300 flex items-center gap-1 px-1 py-1">
      <p className="text-xs text-background pl-1">{name}</p>
      <DeleteTag
        highlightId={highlightId}
        tagId={id}
        onOptimisticDelete={onOptimisticDelete}
      />
    </div>
  );
};

export default TagItem;
