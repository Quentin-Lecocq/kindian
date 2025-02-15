'use server';

import { z } from 'zod';
import { createHighlightTagDB, deleteHighlightTagDB } from '../db/tags';
import { tagSchema } from '../schemas/tags';

type HighlightTagResponse = {
  error: boolean;
  message: string;
};

export const createHighlightTag = async (
  highlightId: string,
  unsafeData: z.infer<typeof tagSchema>
) => {
  const { success, data } = tagSchema.safeParse(unsafeData);

  if (!success) {
    throw new Error('Invalid tag data');
  }

  try {
    const newHighlightTag = await createHighlightTagDB(highlightId, data.name);
    return newHighlightTag;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteHighlightTag = async (
  highlightId: string,
  tagId: string
): Promise<HighlightTagResponse> => {
  try {
    await deleteHighlightTagDB(highlightId, tagId);
    return {
      error: false,
      message: 'Highlight tag deleted successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: 'Failed to delete highlight tag',
    };
  }
};
