import { getNotesDB } from '../db/notes';
import NoteListWrapper from './note-list-wrapper';

type NoteListProps = {
  highlightId: string;
};

const NoteListServer = async ({ highlightId }: NoteListProps) => {
  const notes = await getNotesDB(highlightId);

  return <NoteListWrapper highlightId={highlightId} notes={notes} />;
};

export default NoteListServer;
