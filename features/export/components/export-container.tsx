import TableBooks from '@/features/export/components/table-books';
import { KindleBook } from '@/types/books';
import { useExport } from '../hooks/use-export';
import ExportActions from './export-actions';

type ExportContainerProps = {
  books: KindleBook[];
};

const ExportContainer = ({ books }: ExportContainerProps) => {
  const {
    handleExport,
    selectedBooks,
    handleToggleSelectBook,
    handleToggleSelectAll,
  } = useExport(books);

  if (!selectedBooks.length) return null;

  return (
    <div>
      <ExportActions handleExport={handleExport} />
      <TableBooks
        books={selectedBooks}
        onSelect={handleToggleSelectBook}
        onToggleSelectAll={handleToggleSelectAll}
      />
    </div>
  );
};

export default ExportContainer;
