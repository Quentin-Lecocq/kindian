import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { KindleBook } from '@/types/books';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type TableBooksProps = {
  books: KindleBook[];
  onSelect: (id: string) => void;
  onToggleSelectAll: () => void;
};

const TableBooks: FC<TableBooksProps> = ({
  books,
  onSelect,
  onToggleSelectAll,
}) => {
  const t = useTranslations('export-page.table-books');

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex items-center mb-1">
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
