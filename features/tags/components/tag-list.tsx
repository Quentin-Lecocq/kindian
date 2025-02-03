import { HighlightTag, Tag } from '@prisma/client';
import TagListWrapper from './tag-list-wrapper';

type TagListProps = {
  highlightId: string;
  highlightTags: (HighlightTag & {
    tag: Tag;
  })[];
};

const TagList = async ({ highlightId, highlightTags }: TagListProps) => {
  return (
    <TagListWrapper highlightId={highlightId} initialTags={highlightTags} />
  );
};

export default TagList;
