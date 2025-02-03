import { Button } from '@/components/ui/button';
import { actionToast } from '@/hooks/use-toast';
import { Tag } from '@prisma/client';
import { X } from 'lucide-react';
import { deleteHighlightTag } from '../actions/tags';

type DeleteTagProps = {
  highlightId: string;
  tagId: string;
  onOptimisticDelete: (tag: Tag) => void;
};

const DeleteTag = ({
  highlightId,
  tagId,
  onOptimisticDelete,
}: DeleteTagProps) => {
  const handleDeleteTag = async (formData: FormData) => {
    const highlightId = formData.get('highlightId') as string;
    const tagId = formData.get('tagId') as string;
    onOptimisticDelete({
      id: tagId,
      name: '',
      createdAt: new Date(),
    });
    const data = await deleteHighlightTag(highlightId, tagId);

    if (data.error) {
      actionToast({
        actionData: data,
      });
    }
  };

  return (
    <form action={handleDeleteTag} className="flex items-center">
      <input type="hidden" name="highlightId" value={highlightId} />
      <input type="hidden" name="tagId" value={tagId} />
      <Button variant="link" type="submit" className="p-0 h-fit">
        <X className="cursor-pointer text-background" />
      </Button>
    </form>
  );
};

export default DeleteTag;
