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
import { ICON_CLASSNAME, ICON_SIZE } from '@/utils/constants';
import { Trash } from 'lucide-react';

type DeleteHighlightProps = {
  onDelete: () => void;
};

const DeleteHighlight = ({ onDelete }: DeleteHighlightProps) => {
  const handleDeleteHighlight = () => {
    onDelete();
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
          <AlertDialogAction type="submit" onClick={handleDeleteHighlight}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteHighlight;
