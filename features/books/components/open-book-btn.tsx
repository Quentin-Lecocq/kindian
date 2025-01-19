import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import Link from 'next/link';

type OpenBookBtnProps = {
  id: string;
};

const OpenBookBtn = ({ id }: OpenBookBtnProps) => {
  return (
    <Link href={`/books/${id}`}>
      <Button variant="ghost" size="icon">
        <Eye className="h-4 w-4" />
      </Button>
    </Link>
  );
};

export default OpenBookBtn;
