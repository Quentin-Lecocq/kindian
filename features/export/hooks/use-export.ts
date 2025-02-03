import { useToast } from '@/hooks/use-toast';
import { KindleBook } from '@/types/books';
import { useRouter } from 'next/navigation';
import {
  exportToMarkdownAction,
  saveBooksToDB,
  saveHighlightsToDB,
} from '../actions/export';
import { ExportOptions } from '../types/types';
import { useDownload } from './use-download';
import { useSelection } from './use-selection';

export const useExport = (allBooks: KindleBook[]) => {
  const { toast } = useToast();
  const router = useRouter();
  const { selectedBooks, handleToggleSelectBook, handleToggleSelectAll } =
    useSelection(allBooks);
  const { downloadZip } = useDownload();

  const handleExport = async ({ onlySelectedBooks }: ExportOptions) => {
    const books = onlySelectedBooks
      ? selectedBooks.filter(({ selected }) => selected)
      : allBooks;

    try {
      // TODO: can i run this in parallel?
      await saveBooksToDB(books);
      const files = await exportToMarkdownAction(books);
      await saveHighlightsToDB(files);
      await downloadZip(files);
      toast({
        title: 'Books exported',
        description: `${books.length} books have been exported`,
      });
      router.push('/books');
    } catch (error) {
      // TODO: add toasts/notifications
      console.error('Error exporting books:', error);
      toast({
        title: 'Error',
        description: 'Failed to export books',
        variant: 'destructive',
      });
    }
  };

  return {
    handleExport,
    selectedBooks,
    handleToggleSelectBook,
    handleToggleSelectAll,
  };
};
