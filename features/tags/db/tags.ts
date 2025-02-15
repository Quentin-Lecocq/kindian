import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export const createHighlightTagDB = async (
  highlightId: string,
  tagName: string
) => {
  let tag = await prisma.tag.findFirst({
    where: {
      name: tagName,
    },
  });

  if (!tag) {
    tag = await prisma.tag.create({
      data: {
        name: tagName,
      },
    });
  }

  const createdHighlightTag = await prisma.highlightTag.create({
    data: {
      highlightId,
      tagId: tag.id,
    },
    include: {
      tag: true,
    },
  });

  if (createdHighlightTag == null) {
    throw new Error('Failed to create highlight tag');
  }

  revalidateTag(`highlight-${createdHighlightTag.highlightId}`);

  return createdHighlightTag;
};

export const deleteHighlightTagDB = async (
  highlightId: string,
  tagId: string
) => {
  const deletedHighlightTag = await prisma.highlightTag.delete({
    where: {
      highlightId_tagId: {
        highlightId,
        tagId,
      },
    },
  });

  if (deletedHighlightTag == null) {
    throw new Error('Highlight tag not found');
  }

  revalidateTag(`highlight-${deletedHighlightTag.highlightId}`);

  return deletedHighlightTag;
};
