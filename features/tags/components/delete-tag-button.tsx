'use client';

import { Button } from '@/components/ui/button';
import { actionToast } from '@/hooks/use-toast';
import { TrashIcon } from 'lucide-react';
import { deleteHighlightTag } from '../actions/tags';

type DeleteTagButtonProps = {
  highlightId: string;
  tagId: string;
};

const DeleteTagButton = ({ highlightId, tagId }: DeleteTagButtonProps) => {
  const handleDeleteTag = async (formData: FormData) => {
    const highlightId = formData.get('highlightId') as string;
    const tagId = formData.get('tagId') as string;
    const data = await deleteHighlightTag(highlightId, tagId);
    actionToast({
      actionData: data,
    });
  };

  return (
    <form action={handleDeleteTag}>
      <input type="hidden" name="highlightId" value={highlightId} />
      <input type="hidden" name="tagId" value={tagId} />
      <Button variant="link" type="submit" className="p-0">
        <TrashIcon className="w-3 h-3 cursor-pointer" />
      </Button>
    </form>
  );
};

export default DeleteTagButton;
