import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';

type OpenBookBtnProps = {
  bookId: string;
};

const OpenBookBtn = ({ bookId }: OpenBookBtnProps) => {
  return (
    <Link href={`/books/${bookId}`}>
      <Button variant="ghost" size="icon">
        <Eye className="h-4 w-4" />
      </Button>
    </Link>
  );
};

export default OpenBookBtn;
