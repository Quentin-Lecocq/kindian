'use client';

import { Button } from '@/components/ui/button';
import { actionToast } from '@/hooks/use-toast';
import { Trash2 } from 'lucide-react';
import { deleteBook } from '../actions/books';

type DeleteBookProps = {
  id: string;
  onOptimisticDelete: (id: string) => void;
};

const DeleteBook = ({ id, onOptimisticDelete }: DeleteBookProps) => {
  const handleDeleteBook = async (formData: FormData) => {
    const bookId = formData.get('bookId') as string;
    onOptimisticDelete(bookId);
    const data = await deleteBook(bookId);

    if (data.error) {
      actionToast({
        actionData: data,
      });
    }
  };

  return (
    <form action={handleDeleteBook}>
      <input type="hidden" name="bookId" value={id} />
      <Button variant="ghost" size="icon" type="submit">
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default DeleteBook;
