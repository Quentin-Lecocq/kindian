'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { actionToast } from '@/hooks/use-toast';
import { Trash } from 'lucide-react';
import { deleteHighlight } from '../actions/highlights';
import { ICON_CLASSNAME, ICON_SIZE } from '../utils/constants';

type DeleteHighlightIconProps = {
  id: string;
};

const DeleteHighlightIcon = ({ id }: DeleteHighlightIconProps) => {
  const handleDeleteHighlight = async (formData: FormData) => {
    const id = formData.get('id') as string;
    const data = await deleteHighlight(id);
    actionToast({
      actionData: data,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash
          height={ICON_SIZE}
          width={ICON_SIZE}
          className={ICON_CLASSNAME}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            highlight and remove it from your list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={handleDeleteHighlight}>
            <input type="hidden" name="id" value={id} />
            <AlertDialogAction type="submit">Continue</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteHighlightIcon;
