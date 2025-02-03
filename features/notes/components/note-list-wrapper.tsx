'use client';

import { Note } from '@prisma/client';
import { useOptimistic } from 'react';
import CreateNote from './create-note';
import NoteListClient from './note-list-client';

type OptimisticAction =
  | { type: 'update'; note: Note }
  | { type: 'delete'; id: string }
  | { type: 'create'; note: Note };

type NoteListWrapperProps = {
  highlightId: string;
  initialNotes: Note[];
};

const NoteListWrapper = ({
  highlightId,
  initialNotes,
}: NoteListWrapperProps) => {
  const [optimisticNotes, addOptimisticAction] = useOptimistic(
    initialNotes,
    (state: Note[], action: OptimisticAction) => {
      switch (action.type) {
        case 'update':
          return state.map((note) =>
            note.id === action.note.id ? action.note : note
          );
        case 'delete':
          return state.filter((note) => note.id !== action.id);
        case 'create':
          return [action.note, ...state];
        default:
          return state;
      }
    }
  );

  return (
    <div className="flex mt-6 flex-col my-3">
      <div className="border-b w-full flex justify-between items-center">
        <h4 className="text-sm font-light text-muted-foreground">Notes</h4>
        <CreateNote
          highlightId={highlightId}
          onOptimisticCreate={(newNote) =>
            addOptimisticAction({ type: 'create', note: newNote })
          }
        />
      </div>
      <div className="mt-2">
        {optimisticNotes.length > 0 ? (
          <NoteListClient
            notes={optimisticNotes}
            onOptimisticUpdate={(note) =>
              addOptimisticAction({ type: 'update', note })
            }
            onOptimisticDelete={(id) =>
              addOptimisticAction({ type: 'delete', id })
            }
          />
        ) : (
          <p className="text-sm text-muted-foreground">No notes yet</p>
        )}
      </div>
    </div>
  );
};

export default NoteListWrapper;
