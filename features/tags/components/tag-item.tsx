import { Tag } from '@prisma/client';
import DeleteTagButton from './delete-tag-button';

type TagItemProps = {
  tag: Tag;
  highlightId: string;
  onOptimisticDelete: (tag: Tag) => void;
};

const TagItem = ({ tag, highlightId, onOptimisticDelete }: TagItemProps) => {
  return (
    <div className="flex text-background items-center gap-1 text-xs bg-neutral-300 px-1 py-1">
      {tag.name}
      <DeleteTagButton
        highlightId={highlightId}
        tagId={tag.id}
        onOptimisticDelete={onOptimisticDelete}
      />
    </div>
  );
};

export default TagItem;
