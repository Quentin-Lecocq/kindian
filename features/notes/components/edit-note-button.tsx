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
import { useState } from 'react';

type EditNoteButtonProps = {
  content: string;
  onEdit: (newContent: string) => void;
};

const EditNoteButton = ({ content, onEdit }: EditNoteButtonProps) => {
  const [editedContent, setEditedContent] = useState(content);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(editedContent);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-xs italic underline p-0">
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
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
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
