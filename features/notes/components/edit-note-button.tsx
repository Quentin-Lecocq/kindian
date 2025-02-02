'use client';

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
import { actionToast } from '@/hooks/use-toast';
import { Note } from '@prisma/client';
import { editNote } from '../actions/notes';

type EditNoteButtonProps = {
  note: Note;
  onOptimisticUpdate: (updatedNote: Note) => void;
};

const EditNoteButton = ({ note, onOptimisticUpdate }: EditNoteButtonProps) => {
  const handleEditNote = async (formData: FormData) => {
    const id = formData.get('id') as string;
    const content = formData.get('content') as string;
    onOptimisticUpdate({ ...note, content });

    const data = await editNote(id, { content });
    actionToast({
      actionData: data,
    });
  };

  return (
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
        <form action={handleEditNote}>
          <input type="hidden" name="id" value={note.id} />
          <div className="flex flex-col gap-2">
            <Textarea name="content" defaultValue={note.content} />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" size="sm">
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditNoteButton;
