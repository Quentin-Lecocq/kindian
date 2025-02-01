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
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { ICON_CLASSNAME, ICON_SIZE } from '../utils/constants';

type EditHighlightIconProps = {
  content: string;
  onEdit: (newContent: string) => void;
};

const EditHighlightIcon = ({ content, onEdit }: EditHighlightIconProps) => {
  const [editedContent, setEditedContent] = useState(content);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(editedContent);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil
          height={ICON_SIZE}
          width={ICON_SIZE}
          className={ICON_CLASSNAME}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Highlight</DialogTitle>
          <DialogDescription>Edit the highlight</DialogDescription>
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

export default EditHighlightIcon;
