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
import { ICON_CLASSNAME, ICON_SIZE } from '@/utils/constants';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { useEditHighlight } from '../hooks/use-highlights';

type EditHighlightProps = {
  id: string;
  content: string;
};

const EditHighlight = ({ id, content }: EditHighlightProps) => {
  const [newContent, setNewContent] = useState(content);
  const { mutate } = useEditHighlight();

  const handleEditHighlight = () => {
    mutate({ id, content: newContent });
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
