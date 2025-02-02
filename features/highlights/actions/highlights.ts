'use server';

import {
  deleteHighlightDB,
  editHighlightDB,
  favoriteHighlightDB,
} from '../db/highlights';

type HighlightResponse = {
  error: boolean;
  message: string;
};

export const editHighlight = async (
  id: string,
  content: string
): Promise<HighlightResponse> => {
  try {
    await editHighlightDB(id, content);
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
