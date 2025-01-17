import TableBooks from '@/features/export/components/table-books';
import { Book } from '@/features/export/types';
import ExportActions from './export-actions';

type ExportContainerProps = {
  books: Book[];
};

const ExportContainer = ({ books }: ExportContainerProps) => {
  if (!books.length) return null;

  return (
    <div>
      <ExportActions books={books} />
      <TableBooks
        books={books}
        onSelect={() => {}}
        onToggleSelectAll={() => {}}
      />
    </div>
  );
};

export default ExportContainer;
