'use server';

import { z } from 'zod';
import { createNoteDB, deleteNoteDB, updateNoteDB } from '../db/notes';
import { noteSchema } from '../schemas/notes';

export type NoteResponse = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  highlightId: string;
};

export const createNote = async (
  highlightId: string,
  unsafeData: z.infer<typeof noteSchema>
): Promise<NoteResponse> => {
  const { success, data } = noteSchema.safeParse(unsafeData);

  if (!success) {
    throw new Error('Invalid note data');
  }

  try {
    const newNote = await createNoteDB(highlightId, data.content);
    return newNote;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create note');
  }
};

export const editNote = async (
  id: string,
  unsafeData: z.infer<typeof noteSchema>
): Promise<NoteResponse> => {
  const { success, data } = noteSchema.safeParse(unsafeData);

  if (!success) {
    throw new Error('Invalid note data');
  }

  try {
    const updatedNote = await updateNoteDB(id, data.content);
    return updatedNote;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to edit note');
  }
};

export const deleteNote = async (id: string): Promise<void> => {
  try {
    await deleteNoteDB(id);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete note');
  }
};
