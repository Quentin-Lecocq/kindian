'use client';

import { Note } from '@prisma/client';

import NoteActions from './note-actions';

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
            <NoteActions
              note={note}
              onOptimisticUpdate={(updatedNote) =>
                onOptimisticUpdate(updatedNote)
              }
              onOptimisticDelete={() => onOptimisticDelete(id)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NoteListClient;
