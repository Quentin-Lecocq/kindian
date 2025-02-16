import { prisma } from '@/lib/prisma';
import { revalidatePath, revalidateTag } from 'next/cache';

export const getHighlightsDB = async (cursor?: string) => {
  const items = await prisma.highlight.findMany({
    take: 10 + 1,
    ...(cursor
      ? {
          skip: 1,
          cursor: {
            id: cursor,
          },
        }
      : {}),
    orderBy: {
      addedAt: 'asc',
    },
    include: {
      highlightTags: {
        include: {
          tag: true,
        },
        orderBy: {
          tag: {
            createdAt: 'desc',
          },
        },
      },
      notes: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  return items;
};

export const getFavoritesHighlightsDB = async () => {
  const favoritesHighlights = await prisma.highlight.findMany({
    where: {
      isFavorite: true,
    },
  });

  if (favoritesHighlights == null) {
    throw new Error('Favorites highlights not found');
  }

  return favoritesHighlights;
};

export const editHighlightDB = async (id: string, content: string) => {
  const editedHighlight = await prisma.highlight.update({
    where: {
      id,
    },
    data: {
      content,
    },
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

  revalidatePath('/highlights');

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
