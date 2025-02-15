import { Note } from '@prisma/client';
import CreateNote from './create-note';
import NoteListClient from './note-list-client';

type NoteListWrapperProps = {
  highlightId: string;
  initialNotes: Note[];
};

const NoteListWrapper = ({
  highlightId,
  initialNotes,
}: NoteListWrapperProps) => {
  return (
    <div className="flex mt-6 flex-col my-3">
      <div className="border-b w-full flex justify-between items-center">
        <h4 className="text-sm font-light text-muted-foreground">Notes</h4>
        <CreateNote highlightId={highlightId} />
      </div>
      <div className="mt-2">
        {initialNotes.length > 0 ? (
          <NoteListClient notes={initialNotes} />
        ) : (
          <p className="text-sm text-muted-foreground">No notes yet</p>
        )}
      </div>
    </div>
  );
};

export default NoteListWrapper;
