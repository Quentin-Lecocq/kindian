'use client';

import { Note } from '@prisma/client';

import NoteActions from './note-actions';

type NoteListClientProps = {
  notes: Note[];
};

const NoteListClient = ({ notes }: NoteListClientProps) => {
  return (
    <div className="flex flex-col">
      {notes.map((note) => {
        const { id, content } = note;
        return (
          <div key={id} className="flex items-center gap-4">
            <p className="text-sm text-foreground mr-2">{content}</p>
            <NoteActions note={note} />
          </div>
        );
      })}
    </div>
  );
};

export default NoteListClient;
