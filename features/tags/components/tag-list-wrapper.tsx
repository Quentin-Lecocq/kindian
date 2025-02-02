'use client';

import { Tag } from '@prisma/client';
import { useOptimistic } from 'react';
import CreateTagIcon from './create-tag-icon';
import TagItem from './tag-item';

type TagListWrapperProps = {
  highlightId: string;
  tags: Tag[];
};

type OptimisticAction =
  | { type: 'create'; tag: Tag }
  | { type: 'delete'; id: string };

const TagListWrapper = ({ highlightId, tags }: TagListWrapperProps) => {
  const [optimisticTags, addOptimisticAction] = useOptimistic(
    tags,
    (state: Tag[], action: OptimisticAction) => {
      switch (action.type) {
        case 'create':
          return [action.tag, ...state];
        case 'delete':
          return state.filter((tag) => tag.id !== action.id);
        default:
          return state;
      }
    }
  );

  return (
    <>
      <CreateTagIcon
        highlightId={highlightId}
        onOptimisticCreate={(newTag) =>
          addOptimisticAction({ type: 'create', tag: newTag })
        }
      />
      <div className="flex items-center gap-4">
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
