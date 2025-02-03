import { prisma } from '@/lib/prisma';
import { revalidateTag } from 'next/cache';

export const createNoteDB = async (highlightId: string, content: string) => {
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

  revalidateTag(`highlight-${note.highlightId}`);

  return note;
};

export const updateNoteDB = async (id: string, content: string) => {
  const note = await prisma.note.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });

  if (note == null) {
    throw new Error('Note not found');
  }

  revalidateTag(`highlight-${note.highlightId}`);

  return note;
};

export const deleteNoteDB = async (id: string) => {
  const deletedNote = await prisma.note.delete({
    where: { id },
  });

  if (deletedNote == null) {
    throw new Error('Note not found');
  }

  revalidateTag(`highlight-${deletedNote.highlightId}`);

  return deletedNote;
};
