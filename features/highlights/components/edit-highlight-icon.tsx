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
import { ICON_CLASSNAME, ICON_SIZE } from '@/utils/constants';
import { Pencil } from 'lucide-react';
import { editHighlight } from '../actions/highlights';

type EditHighlightIconProps = {
  id: string;
  content: string;
};

const EditHighlightIcon = ({ id, content }: EditHighlightIconProps) => {
  const handleEditHighlight = async (formData: FormData) => {
    const id = formData.get('id') as string;
    const content = formData.get('content') as string;
    const data = await editHighlight(id, content);
    actionToast({
      actionData: data,
    });
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
          <form action={handleEditHighlight}>
            <input type="hidden" name="id" value={id} />
            <Textarea name="content" defaultValue={content} />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" size="sm">
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditHighlightIcon;
