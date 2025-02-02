'use client';

import { Note } from '@prisma/client';

import DeleteNoteButton from './delete-note-button';
import EditNoteButton from './edit-note-button';

type NoteListClientProps = {
  notes: Note[];
  onOptimisticUpdate: (note: Note) => void;
  onOptimisticDelete: (id: string) => void;
};

const NoteListClient = ({
  notes,
  onOptimisticUpdate,
  onOptimisticDelete,
}: NoteListClientProps) => {
  return (
    <div className="flex flex-col">
      {notes.map((note) => {
        const { id, content } = note;
        return (
          <div key={id} className="flex items-center gap-4">
            <p className="text-sm text-foreground mr-2">{content}</p>
            <div className="flex gap-2">
              <EditNoteButton
                note={note}
                onOptimisticUpdate={(updatedNote) =>
                  onOptimisticUpdate(updatedNote)
                }
              />
              <DeleteNoteButton
                id={note.id}
                onOptimisticDelete={() => onOptimisticDelete(id)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NoteListClient;
