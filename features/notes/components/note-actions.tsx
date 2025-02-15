import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Note } from '@prisma/client';
import { useState } from 'react';
import { useDeleteNoteFromHighlight, useEditNote } from '../hooks/use-notes';

type NoteActionsProps = {
  note: Note;
};

const NoteActions = ({ note }: NoteActionsProps) => {
  const [newContent, setNewContent] = useState(note.content);
  const { mutate: deleteNote } = useDeleteNoteFromHighlight();
  const { mutate: editNote } = useEditNote();

  const handleEditNote = () => {
    editNote({ id: note.id, content: newContent });
  };

  return (
    <div className="flex gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="link"
            className="text-xs italic text-muted-foreground hover:text-foreground transition-colors underline p-0"
          >
            edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Note</DialogTitle>
            <DialogDescription>
              Edit the note for this highlight
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" size="sm" onClick={handleEditNote}>
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      <Button
        variant="link"
        type="submit"
        onClick={() => deleteNote({ noteId: note.id })}
        className="text-xs italic text-muted-foreground hover:text-foreground transition-colors underline p-0"
      >
        delete
      </Button>
    </div>
  );
};

export default NoteActions;
