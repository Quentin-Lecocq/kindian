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
import { ICON_SIZE } from '@/features/notes/utils/constants';
import { Tags } from 'lucide-react';
import { useState } from 'react';
import { ICON_CLASSNAME } from '../utils/constants';

const TagHighlightIcon = ({
  onCreate,
}: {
  onCreate: (content: string) => void;
}) => {
  const [content, setContent] = useState('');

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Tags size={ICON_SIZE} className={ICON_CLASSNAME} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create a tag</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Create a tag for this highlight
        </AlertDialogDescription>
        <Input
          placeholder="Tag name"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onCreate(content)}>
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TagHighlightIcon;
