import { Button } from '@/components/ui/button';
import { FolderIcon } from 'lucide-react';
import Link from 'next/link';

type OpenButtonLinkProps = {
  id: string;
};

const OpenButtonLink = ({ id }: OpenButtonLinkProps) => {
  return (
    <Link className="flex-1" href={`/books/${id}`}>
      <Button className="w-full" variant="outline">
        <FolderIcon />
        Open
      </Button>
    </Link>
  );
};

export default OpenButtonLink;
