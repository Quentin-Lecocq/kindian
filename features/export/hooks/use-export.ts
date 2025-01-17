import { saveBooksToDb } from '../api/books';
import { exportToMarkdown } from '../api/export';
import { Book } from '../types';
import { useDownload } from './use-download';
import { useSelection } from './use-selection';

type ExportOptions = {
  onlySelectedBooks: boolean;
};

export const useExport = (allBooks: Book[]) => {
  const { selectedBooks, handleToggleSelectBook, handleToggleSelectAll } =
    useSelection(allBooks);
  const { downloadZip } = useDownload();

  const handleExport = async ({ onlySelectedBooks }: ExportOptions) => {
    const books = onlySelectedBooks
      ? selectedBooks.filter(({ selected }) => selected)
      : allBooks;

    try {
      await saveBooksToDb(books);
      const files = await exportToMarkdown(books);
      await downloadZip(files);
    } catch (error) {
      // TODO: add toasts/notifications
      console.error('Error exporting books:', error);
    }
  };

  return {
    handleExport,
    selectedBooks,
    handleToggleSelectBook,
    handleToggleSelectAll,
  };
};
