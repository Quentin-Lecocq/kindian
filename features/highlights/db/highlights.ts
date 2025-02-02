import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export const editHighlightDB = async (id: string, content: string) => {
  const editedHighlight = await prisma.highlight.update({
    where: { id },
    data: { content },
  });

  if (editedHighlight == null) {
    throw new Error('Highlight not found');
  }

  revalidateTag(`highlight-${editedHighlight.id}`);

  return editedHighlight;
};

export const deleteHighlightDB = async (id: string) => {
  const deletedHighlight = await prisma.highlight.delete({
    where: { id },
  });

  if (deletedHighlight == null) {
    throw new Error('Highlight not found');
  }

  revalidateTag(`highlight-${deletedHighlight.id}`);

  return deletedHighlight;
};

export const favoriteHighlightDB = async (id: string, isFavorite: boolean) => {
  const favoriteHighlight = await prisma.highlight.update({
    where: { id },
    data: { isFavorite },
  });

  if (favoriteHighlight == null) {
    throw new Error('Highlight not found');
  }

  revalidateTag(`highlight-${favoriteHighlight.id}`);

  return favoriteHighlight;
};
