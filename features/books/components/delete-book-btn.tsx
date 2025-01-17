'use client';

import { Button } from '@/components/ui/button';
import { FC, useTransition } from 'react';
import { deleteBook } from '../server/actions/books';
type DeleteBookBtnProps = {
  bookId: string;
};

const DeleteBookBtn: FC<DeleteBookBtnProps> = ({ bookId }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={() => startTransition(() => deleteBook(bookId))}
      variant="destructive"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </Button>
  );
};

export default DeleteBookBtn;
