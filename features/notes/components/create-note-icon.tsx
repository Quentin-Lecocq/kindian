'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { actionToast } from '@/hooks/use-toast';
import { ICON_CLASSNAME, ICON_SIZE } from '@/utils/constants';
import { Note } from '@prisma/client';
import { Edit } from 'lucide-react';
import { createNote } from '../actions/notes';

type CreateNoteIconProps = {
  highlightId: string;
  onOptimisticCreate: (newNote: Note) => void;
};

const CreateNoteIcon = ({
  highlightId,
  onOptimisticCreate,
}: CreateNoteIconProps) => {
  const handleCreateNote = async (formData: FormData) => {
    const content = formData.get('content') as string;
    onOptimisticCreate({
      id: '',
      content,
      highlightId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const data = await createNote(highlightId, { content });

    actionToast({
      actionData: data,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit height={ICON_SIZE} width={ICON_SIZE} className={ICON_CLASSNAME} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
        </DialogHeader>
        <form action={handleCreateNote}>
          <div className="flex flex-col gap-2">
            <Textarea name="content" />
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

export default CreateNoteIcon;
