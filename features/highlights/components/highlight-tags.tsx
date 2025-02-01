import { HighlightTag, Tag } from '../utils/types';
import HighlightTagItem from './highlight-tag-item';

type HighlightTagsProps = {
  tags: (HighlightTag & {
    tag: Tag;
  })[];
  onDelete: (id: string) => void;
};

const HighlightTags = ({ tags, onDelete }: HighlightTagsProps) => {
  return (
    <>
      <div className="flex items-center gap-4">
        {tags.map(({ tag }) => {
          return (
            <HighlightTagItem key={tag.id} tag={tag} onDelete={onDelete} />
          );
        })}
      </div>
    </>
  );
};

export default HighlightTags;
