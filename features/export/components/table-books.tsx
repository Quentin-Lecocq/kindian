'use client';

import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useScopedI18n } from '@/locales/clients';
import { KindleBook } from '@/types/books';
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
  const t = useScopedI18n('export_page.table_book');

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex items-center">
            <Checkbox onCheckedChange={onToggleSelectAll} />
          </TableHead>
          <TableHead className="text-sm font-regular">{t('name')}</TableHead>
          <TableHead className="text-sm font-regular">{t('author')}</TableHead>
          <TableHead className="text-sm font-regular">
            {t('highlights')}
          </TableHead>
          <TableHead className="text-sm font-regular">{t('notes')}</TableHead>
          <TableHead className="text-sm font-regular">
            {t('bookmarks')}
          </TableHead>
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
