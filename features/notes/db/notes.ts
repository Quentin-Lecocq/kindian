import { prisma } from '@/lib/prisma';

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

  return note;
};

export const deleteNoteDB = async (id: string) => {
  const deletedNote = await prisma.note.delete({
    where: {
      id,
    },
  });

  if (deletedNote == null) {
    throw new Error('Note not found');
  }
};
