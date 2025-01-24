'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useDeleteBook } from '../hooks/use-delete-book';

type DeleteBookBtnProps = {
  id: string;
};

const DeleteBookBtn = ({ id }: DeleteBookBtnProps) => {
  const { mutate: deleteBook } = useDeleteBook();

  return (
    <Button variant="ghost" size="icon" onClick={() => deleteBook(id)}>
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};

export default DeleteBookBtn;
