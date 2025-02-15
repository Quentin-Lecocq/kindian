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
import { ICON_CLASSNAME, ICON_SIZE } from '@/utils/constants';
import { Tags } from 'lucide-react';
import { useState } from 'react';

type CreateTagProps = {
  onCreate: (name: string) => void;
};

const CreateTag = ({ onCreate }: CreateTagProps) => {
  const [name, setName] = useState('');

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
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        />
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onCreate(name)} disabled={!name}>
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateTag;
