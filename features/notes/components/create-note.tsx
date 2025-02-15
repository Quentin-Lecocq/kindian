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
import { ICON_CLASSNAME, ICON_SIZE } from '@/utils/constants';
import { Edit } from 'lucide-react';
import { useState } from 'react';
import { useAddNoteToHighlight } from '../hooks/use-notes';

type CreateNoteProps = {
  highlightId: string;
};

const CreateNote = ({ highlightId }: CreateNoteProps) => {
  const [content, setContent] = useState('');
  const { mutate: createNote } = useAddNoteToHighlight();

  const handleCreateNote = () => {
    createNote({ id: highlightId, content });
    setContent('');
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
        <div className="flex flex-col gap-2">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" size="sm" onClick={handleCreateNote}>
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNote;
