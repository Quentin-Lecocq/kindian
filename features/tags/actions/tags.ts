'use server';

import { createHighlightTagDB, deleteHighlightTagDB } from '../db/tags';

type HighlightTagResponse = {
  error: boolean;
  message: string;
};

export const createHighlightTag = async (
  highlightId: string,
  tagName: string
): Promise<HighlightTagResponse> => {
  try {
    await createHighlightTagDB(highlightId, tagName);
    return { error: false, message: 'Highlight tag created successfully' };
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Failed to create highlight tag' };
  }
};

export const deleteHighlightTag = async (
  highlightId: string,
  tagId: string
): Promise<HighlightTagResponse> => {
  try {
    await deleteHighlightTagDB(highlightId, tagId);
    return { error: false, message: 'Highlight tag deleted successfully' };
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Failed to delete highlight tag' };
  }
};
