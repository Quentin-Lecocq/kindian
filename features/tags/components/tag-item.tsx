import { Tag } from '@prisma/client';
import DeleteTagButton from './delete-tag-button';

type TagItemProps = {
  tag: Tag;
  highlightId: string;
  onOptimisticDelete: (tag: Tag) => void;
};

const TagItem = ({ tag, highlightId, onOptimisticDelete }: TagItemProps) => {
  return (
    <div className="bg-neutral-300 flex items-center gap-1 px-1 py-1">
      <p className="text-xs text-background pl-1">{tag.name}</p>
      <DeleteTagButton
        highlightId={highlightId}
        tagId={tag.id}
        onOptimisticDelete={onOptimisticDelete}
      />
    </div>
  );
};

export default TagItem;
