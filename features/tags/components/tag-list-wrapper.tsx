'use client';

import { HighlightTag, Tag } from '@prisma/client';
import {
  useAddTagToHighlight,
  useDeleteTagFromHighlight,
} from '../hooks/use-tags';
import CreateTag from './create-tag';
import TagItem from './tag-item';

type TagListWrapperProps = {
  highlightId: string;
  initialTags: (HighlightTag & {
    tag: Tag;
  })[];
};

const TagListWrapper = ({ highlightId, initialTags }: TagListWrapperProps) => {
  const { mutate: deleteTag } = useDeleteTagFromHighlight();
  const { mutate: createTag } = useAddTagToHighlight();

  const handleDeleteTag = (tagId: string) => {
    deleteTag({ highlightId, tagId });
  };

  const handleCreateTag = (name: string) => {
    createTag({ highlightId, name });
  };

  return (
    <>
      <CreateTag onCreate={handleCreateTag} />
      <div className="flex items-center gap-4 pl-4">
        {initialTags.map(({ tag }) => {
          return (
            <TagItem
              key={tag.id}
              tag={tag}
              onDelete={() => handleDeleteTag(tag.id)}
            />
          );
        })}
      </div>
    </>
  );
};

export default TagListWrapper;
