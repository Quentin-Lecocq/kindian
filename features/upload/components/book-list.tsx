import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { Book } from '../type';

type BookListProps = {
  books: Book[];
  onSelect: (index: number) => void;
  onExport: () => void;
};

const BookList: FC<BookListProps> = ({ books, onSelect, onExport }) => {
  return (
    <div>
      <h2>Select books to export:</h2>
      {books.map(({ title, highlights, selected }, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={selected}
            onChange={() => onSelect(index)}
          />
          <span>
            {title} ({highlights.length} highlights)
          </span>
        </div>
      ))}
      <Button onClick={onExport}>Export Selected Books</Button>
    </div>
  );
};

export default BookList;
