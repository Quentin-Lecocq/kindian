import { prisma } from '@/lib/prisma';
import { Note } from '@prisma/client';
import NoteListWrapper from './note-list-wrapper';

type NoteListProps = {
  highlightId: string;
};

const NoteList = async ({ highlightId }: NoteListProps) => {
  const notes = await getNotes(highlightId);

  return (
    <div className="flex mt-6 flex-col my-3">
      <NoteListWrapper highlightId={highlightId} notes={notes} />
    </div>
  );
};

export default NoteList;

const getNotes = async (highlightId: string): Promise<Note[]> => {
  try {
    const notes = await prisma.note.findMany({
      where: {
        highlightId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return notes;
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};
