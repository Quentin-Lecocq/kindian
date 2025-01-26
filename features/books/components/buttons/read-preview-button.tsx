import { Button } from '@/components/ui/button';
import { BookIcon } from 'lucide-react';

type ReadPreviewButtonProps = {
  link: string | null;
};

const ReadPreviewButton = ({ link }: ReadPreviewButtonProps) => {
  return (
    <a
      className="w-full"
      href={link || ''}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button className="w-full">
        <BookIcon />
        Read Preview
      </Button>
    </a>
  );
};

export default ReadPreviewButton;
