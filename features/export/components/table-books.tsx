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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex items-center mb-1">
            <Checkbox onCheckedChange={onToggleSelectAll} />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Highlights</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Bookmarks</TableHead>
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
