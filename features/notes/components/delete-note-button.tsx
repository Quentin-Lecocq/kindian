import { Button } from '@/components/ui/button';
import { actionToast } from '@/hooks/use-toast';
import { deleteNote } from '../actions/notes';

type DeleteNoteButtonProps = {
  id: string;
  onOptimisticDelete: (id: string) => void;
};

const DeleteNoteButton = ({
  id,
  onOptimisticDelete,
}: DeleteNoteButtonProps) => {
  const handleDeleteNote = async (formData: FormData) => {
    const id = formData.get('id') as string;
    onOptimisticDelete(id);
    const data = await deleteNote(id);
    actionToast({
      actionData: data,
    });
  };

  return (
    <form action={handleDeleteNote}>
      <input type="hidden" name="id" value={id} />
      <Button
        variant="link"
        type="submit"
        className="text-xs italic text-muted-foreground hover:text-foreground transition-colors underline p-0"
      >
        delete
      </Button>
    </form>
  );
};

export default DeleteNoteButton;
