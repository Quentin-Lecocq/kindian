import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { Book } from '../type';

type BookListProps = {
  books: Book[];
  onSelectBook: (index: number) => void;
  onExport: () => void;
};

const BookList: FC<BookListProps> = ({ books, onSelectBook, onExport }) => {
  return (
    <div>
      <h2>Select books to export:</h2>
      {books.map((book, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={book.selected}
            onChange={() => onSelectBook(index)}
          />
          <span>
            {book.title} ({book.highlights.length} highlights)
          </span>
        </div>
      ))}
      <Button onClick={onExport}>Export Selected Books</Button>
    </div>
  );
};

export default BookList;
