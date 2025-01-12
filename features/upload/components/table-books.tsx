import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FC } from 'react';
import { Book } from '../type';

type TableBooksProps = {
  books: Book[];
  onSelect: (index: number) => void;
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
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex items-center">
            <Checkbox onCheckedChange={onToggleSelectAll} />
          </TableHead>
          <TableHead>BOOKS NAME</TableHead>
          <TableHead>AUTHOR</TableHead>
          <TableHead>HIGHLIGHTS</TableHead>
          <TableHead>NOTES</TableHead>
          <TableHead>BOOKMARKS</TableHead>
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
