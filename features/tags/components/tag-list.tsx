import { prisma } from '@/lib/prisma';
import { Tag } from '@prisma/client';
import TagItem from './tag-item';

type TagListProps = {
  highlightId: string;
};

const TagList = async ({ highlightId }: TagListProps) => {
  const tags = await getTags(highlightId);

  return (
    <>
      <div className="flex items-center gap-4">
        {tags.map((tag) => {
          return <TagItem key={tag.id} tag={tag} highlightId={highlightId} />;
        })}
      </div>
    </>
  );
};

export default TagList;

const getTags = async (highlightId: string): Promise<Tag[]> => {
  const tags = await prisma.tag.findMany({
    where: {
      highlightTags: {
        some: {
          highlightId,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return tags;
};
