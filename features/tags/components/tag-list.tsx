import { prisma } from '@/lib/prisma';
import { Tag } from '@prisma/client';
import TagListWrapper from './tag-list-wrapper';

type TagListProps = {
  highlightId: string;
};

const TagList = async ({ highlightId }: TagListProps) => {
  const tags = await getTags(highlightId);

  return <TagListWrapper highlightId={highlightId} tags={tags} />;
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
