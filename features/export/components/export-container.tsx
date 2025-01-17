import TableBooks from '@/features/upload/components/table-books';

import { Book } from '@/features/upload/type';
import ExportActions from './export-actions';

type ExportContainerProps = {
  books: Book[];
};

const ExportContainer = ({ books }: ExportContainerProps) => {
  if (!books.length) return null;

  return (
    <div>
      <ExportActions />
      <TableBooks
        books={books}
        onSelect={() => {}}
        onToggleSelectAll={() => {}}
      />
    </div>
  );
};

export default ExportContainer;
