'use server';

import { z } from 'zod';
import { createNoteDB, deleteNoteDB, updateNoteDB } from '../db/notes';
import { noteSchema } from '../schemas/notes';

type NoteResponse = {
  error: boolean;
  message: string;
};

export const createNote = async (
  highlightId: string,
  unsafeData: z.infer<typeof noteSchema>
): Promise<NoteResponse> => {
  const { success, data } = noteSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: 'Invalid note data' };
  }

  try {
    await createNoteDB(highlightId, data.content);
    return { error: false, message: 'Note created successfully' };
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Failed to create note' };
  }
};

export const editNote = async (
  id: string,
  unsafeData: z.infer<typeof noteSchema>
): Promise<NoteResponse> => {
  const { success, data } = noteSchema.safeParse(unsafeData);

  if (!success) {
    return { error: true, message: 'Invalid note data' };
  }

  try {
    await updateNoteDB(id, data);
    return { error: false, message: 'Note edited successfully' };
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Failed to edit note' };
  }
};

export const deleteNote = async (id: string): Promise<NoteResponse> => {
  try {
    await deleteNoteDB(id);
    return { error: false, message: 'Note deleted successfully' };
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Failed to delete note' };
  }
};
