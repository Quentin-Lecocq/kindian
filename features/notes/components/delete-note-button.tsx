import { Button } from '@/components/ui/button';

type DeleteNoteButtonProps = {
  onDelete: () => void;
};

const DeleteNoteButton = ({ onDelete }: DeleteNoteButtonProps) => (
  <Button
    onClick={onDelete}
    variant="link"
    className="text-xs italic text-muted-foreground hover:text-foreground transition-colors underline p-0"
  >
    delete
  </Button>
);

export default DeleteNoteButton;
