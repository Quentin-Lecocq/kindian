import { Button } from '@/components/ui/button';

type DeleteNoteButtonProps = {
  onDelete: () => void;
};

const DeleteNoteButton = ({ onDelete }: DeleteNoteButtonProps) => {
  return (
    <Button
      onClick={onDelete}
      variant="link"
      className="text-xs italic underline p-0"
    >
      delete
    </Button>
  );
};

export default DeleteNoteButton;
