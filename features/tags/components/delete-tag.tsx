import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useDeleteTagFromHighlight } from '../hooks/use-tags';

type DeleteTagProps = {
  highlightId: string;
  tagId: string;
};

const DeleteTag = ({ highlightId, tagId }: DeleteTagProps) => {
  const { mutate: deleteTag } = useDeleteTagFromHighlight();

  const handleDeleteTag = () => {
    deleteTag({ highlightId, tagId });
  };

  return (
    <Button variant="link" onClick={handleDeleteTag} className="p-0 h-fit">
      <X className="cursor-pointer text-background" />
    </Button>
  );
};

export default DeleteTag;
