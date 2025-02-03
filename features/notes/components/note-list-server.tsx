import { Note } from '@prisma/client';
import NoteListWrapper from './note-list-wrapper';

type NoteListProps = {
  highlightId: string;
  highlightNotes: Note[];
};

const NoteListServer = async ({
  highlightId,
  highlightNotes,
}: NoteListProps) => {
  return (
    <NoteListWrapper highlightId={highlightId} initialNotes={highlightNotes} />
  );
};

export default NoteListServer;
