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
import { Edit } from 'lucide-react';
import { useState } from 'react';

type CreateNoteIconProps = {
  onCreate: (content: string) => void;
};

const CreateNoteIcon = ({ onCreate }: CreateNoteIconProps) => {
  const [newContent, setNewContent] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(newContent);
    setNewContent('');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Edit
          height={16}
          width={16}
          className="text-muted-foreground cursor-pointer"
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Note</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
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

export default CreateNoteIcon;
