import { prisma } from '@/lib/prisma';
import { Note } from '@prisma/client';
import { revalidateTag } from 'next/cache';

export const createNoteDB = async (
  highlightId: string,
  content: string
): Promise<Note> => {
  const note = await prisma.note.create({
    data: {
      content,
      highlight: {
        connect: {
          id: highlightId,
        },
      },
    },
  });

  if (note == null) {
    throw new Error('Failed to create note');
  }

  revalidateTag(`highlight-${note.highlightId}-notes`);

  return note;
};

export const updateNoteDB = async (id: string, data: Partial<Note>) => {
  const note = await prisma.note.update({
    where: {
      id,
    },
    data,
  });

  if (note == null) {
    throw new Error('Note not found');
  }

  revalidateTag(`highlight-${note.highlightId}-notes`);

  return note;
};

export const deleteNoteDB = async (id: string) => {
  const deletedNote = await prisma.note.delete({
    where: { id },
  });

  if (deletedNote == null) {
    throw new Error('Note not found');
  }

  revalidateTag(`highlight-${deletedNote.highlightId}-notes`);

  return deletedNote;
};
