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
import { ICON_CLASSNAME } from '@/features/highlights/utils/constants';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { ICON_SIZE } from '../utils/constants';

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
        <Edit height={ICON_SIZE} width={ICON_SIZE} className={ICON_CLASSNAME} />
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
