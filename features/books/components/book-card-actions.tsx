import { Button } from '@/components/ui/button';
import { BookIcon } from 'lucide-react';
import DownloadButton from './buttons/download-button';
import OpenButtonLink from './buttons/open-button-link';

type BookCardActionsProps = {
  id: string;
  googleBooksLink: string | null;
};

const BookCardActions = ({ googleBooksLink, id }: BookCardActionsProps) => {
  return (
    <div className="flex flex-col w-full gap-2 justify-center">
      <a
        className="w-full"
        href={googleBooksLink || ''}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="w-full">
          <BookIcon />
          Read Preview
        </Button>
      </a>
      <div className="flex justify-center w-full items-center">
        <DownloadButton onClick={() => {}} />
        <OpenButtonLink id={id} />
      </div>
    </div>
  );
};

export default BookCardActions;
