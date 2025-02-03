'use client';

import { HighlightTag, Tag } from '@prisma/client';
import { useOptimistic } from 'react';
import CreateTag from './create-tag';
import TagItem from './tag-item';

type TagListWrapperProps = {
  highlightId: string;
  initialTags: (HighlightTag & {
    tag: Tag;
  })[];
};

type OptimisticAction =
  | { type: 'create'; tag: Tag }
  | { type: 'delete'; id: string };

const TagListWrapper = ({ highlightId, initialTags }: TagListWrapperProps) => {
  const [optimisticTags, addOptimisticAction] = useOptimistic(
    initialTags.map((tag) => tag.tag),
    (state: Tag[], action: OptimisticAction) => {
      switch (action.type) {
        case 'create':
          return [action.tag, ...state];
        case 'delete':
          return state.filter(({ id }) => id !== action.id);
        default:
          return state;
      }
    }
  );

  return (
    <>
      <CreateTag
        highlightId={highlightId}
        onOptimisticCreate={(newTag) =>
          addOptimisticAction({ type: 'create', tag: newTag })
        }
      />
      <div className="flex items-center gap-4 pl-4">
        {optimisticTags.map((tag) => {
          return (
            <TagItem
              key={tag.id}
              tag={tag}
              highlightId={highlightId}
              onOptimisticDelete={(tag) =>
                addOptimisticAction({ type: 'delete', id: tag.id })
              }
            />
          );
        })}
      </div>
    </>
  );
};

export default TagListWrapper;
