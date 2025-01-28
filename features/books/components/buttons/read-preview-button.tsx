import { Button } from '@/components/ui/button';
import { BookIcon } from 'lucide-react';

type ReadPreviewButtonProps = {
  link: string | null;
};

const ReadPreviewButton = ({ link }: ReadPreviewButtonProps) => {
  return (
    <Button className="w-full">
      <a
        className="w-full flex items-center justify-center gap-2"
        href={link || ''}
        target="_blank"
        rel="noopener noreferrer"
      >
        <BookIcon />
        Read Preview
      </a>
    </Button>
  );
};

export default ReadPreviewButton;
