'use client';

import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useBooks } from '../hooks/use-books';

type DeleteBookBtnProps = {
  bookId: string;
};

const DeleteBookBtn = ({ bookId }: DeleteBookBtnProps) => {
  const { deleteBook } = useBooks();

  return (
    <Button variant="ghost" size="icon" onClick={() => deleteBook(bookId)}>
      <Trash2 className="h-4 w-4" />
    </Button>
  );
};

export default DeleteBookBtn;
