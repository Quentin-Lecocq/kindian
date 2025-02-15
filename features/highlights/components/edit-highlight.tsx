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
import { ICON_CLASSNAME, ICON_SIZE } from '@/utils/constants';
import { Pencil } from 'lucide-react';
import { useState } from 'react';

type EditHighlightProps = {
  onEdit: (content: string) => void;
  content: string;
};

const EditHighlight = ({ onEdit, content }: EditHighlightProps) => {
  const [newContent, setNewContent] = useState(content);

  const handleEditHighlight = () => {
    onEdit(newContent);
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
        <div className="flex flex-col gap-2">
          <Textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" size="sm" onClick={handleEditHighlight}>
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditHighlight;
