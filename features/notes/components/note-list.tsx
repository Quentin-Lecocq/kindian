import { useDeleteNote } from '@/features/notes/hooks/use-delete-note';
import { useEditNote } from '@/features/notes/hooks/use-edit-note';
import { Note } from '@/features/notes/utils/types';
import DeleteNoteButton from './delete-note-button';
import EditNoteButton from './edit-note-button';

type NoteListProps = {
  notes: Note[];
};

const NoteList = ({ notes }: NoteListProps) => {
  const { mutate: deleteNoteHighlight } = useDeleteNote();
  const { mutate: editNoteHighlight } = useEditNote();

  return (
    <div className="flex mt-6 flex-col my-3">
      <div className="border-b w-full">
        <h4 className="text-sm font-light text-muted-foreground">Notes</h4>
      </div>
      {notes.map(({ id, content }) => (
        <div key={id} className="flex items-center gap-4">
          <p className="text-sm text-foreground mr-2">{content}</p>
          <div className="flex gap-2">
            <EditNoteButton
              content={content}
              onEdit={(newContent) =>
                editNoteHighlight({ id, content: newContent })
              }
            />
            <DeleteNoteButton onDelete={() => deleteNoteHighlight(id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
