import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useScopedI18n } from '@/locales/client';
import { FC } from 'react';
import { Book } from '../type';

type TableBooksProps = {
  books: Book[];
  onSelect: (id: string) => void;
  onToggleSelectAll: () => void;
};

// title
// number highlights
// tags ??

const TableBooks: FC<TableBooksProps> = ({
  books,
  onSelect,
  onToggleSelectAll,
}) => {
  const t = useScopedI18n('pages.export.table.books');

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex items-center">
            <Checkbox onCheckedChange={onToggleSelectAll} />
          </TableHead>
          <TableHead>{t('name')}</TableHead>
          <TableHead>{t('author')}</TableHead>
          <TableHead>{t('highlights')}</TableHead>
          <TableHead>{t('notes')}</TableHead>
          <TableHead>{t('bookmarks')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books.map(({ id, selected, title, author, highlights }) => (
          <TableRow key={id}>
            <TableCell className="flex items-center">
              <Checkbox
                checked={selected}
                onCheckedChange={() => onSelect(id)}
              />
            </TableCell>
            <TableCell>{title}</TableCell>
            <TableCell>{author}</TableCell>
            <TableCell>{highlights.length}</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableBooks;
