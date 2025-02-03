import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const saveHighlightsDB = async (
  data: Prisma.HighlightCreateManyInput[]
) => {
  const highlights = await prisma.highlight.createMany({
    data,
  });

  if (highlights == null) {
    throw new Error('Failed to save highlights');
  }

  return highlights;
};
