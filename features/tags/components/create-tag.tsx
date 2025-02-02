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
import { Input } from '@/components/ui/input';
import { actionToast } from '@/hooks/use-toast';
import { ICON_CLASSNAME, ICON_SIZE } from '@/utils/constants';
import { Tag } from '@prisma/client';
import { Tags } from 'lucide-react';
import { createHighlightTag } from '../actions/tags';

type CreateTagProps = {
  highlightId: string;
  onOptimisticCreate: (tag: Tag) => void;
};

const CreateTag = ({ highlightId, onOptimisticCreate }: CreateTagProps) => {
  const handleCreateTag = async (formData: FormData) => {
    const id = formData.get('highlightId') as string;
    const name = formData.get('name') as string;
    if (!name.length) return;

    onOptimisticCreate({
      id: '',
      name,
      createdAt: new Date(),
    });
    const data = await createHighlightTag(id, {
      name,
    });

    if (data.error) {
      actionToast({
        actionData: data,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Tags size={ICON_SIZE} className={ICON_CLASSNAME} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a tag</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Create a tag for this highlight
        </AlertDialogDescription>
        <form action={handleCreateTag}>
          <input type="hidden" name="highlightId" value={highlightId} />
          <Input name="name" placeholder="name" />
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Create</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateTag;
