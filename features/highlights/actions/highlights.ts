'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import {
  deleteHighlightDB,
  editHighlightDB,
  favoriteHighlightDB,
} from '../db/highlights';
import { highlightSchema } from '../schemas/highlights';
import { HighlightWithTagsAndNotes } from '../types/types';

export type PaginatedHighlights = {
  highlights: HighlightWithTagsAndNotes[];
  hasMore: boolean;
  nextCursor?: string;
};

type HighlightResponse = {
  error: boolean;
  message: string;
};

export const getHighlights = async (
  cursor?: string
): Promise<PaginatedHighlights> => {
  try {
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

    const hasMore = items.length > 10;
    const highlights = hasMore ? items.slice(0, -1) : items;
    const nextCursor = hasMore ? items[items.length - 1].id : undefined;

    return {
      highlights,
      hasMore,
      nextCursor,
    };
  } catch (error) {
    console.error('Error fetching highlights:', error);
    return {
      highlights: [],
      hasMore: false,
      nextCursor: undefined,
    };
  }
};

export const editHighlight = async (
  id: string,
  unsafeData: z.infer<typeof highlightSchema>
): Promise<HighlightResponse> => {
  const { success, data } = highlightSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: 'Invalid highlight data' };
  }

  try {
    await editHighlightDB(id, data.content);
    return { error: false, message: 'Highlight edited successfully' };
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Failed to edit highlight' };
  }
};

export const deleteHighlight = async (
  id: string
): Promise<HighlightResponse> => {
  try {
    await deleteHighlightDB(id);
    return { error: false, message: 'Highlight deleted successfully' };
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Failed to delete highlight' };
  }
};

export const favoriteHighlight = async (
  id: string,
  isFavorite: boolean
): Promise<HighlightResponse> => {
  try {
    await favoriteHighlightDB(id, isFavorite);
    return { error: false, message: 'Highlight favorited successfully' };
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Failed to favorite highlight' };
  }
};
