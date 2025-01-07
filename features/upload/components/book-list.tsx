import { FC } from 'react';
import { Book } from '../type';
import BookListCard from './book-list-card';

type BookListProps = {
  books: Book[];
  onSelect: (index: number) => void;
};

// title
// number highlights
// picture books => Open Library API ???
// tags ??

const BookList: FC<BookListProps> = ({ books, onSelect }) => {
  return (
    <div className="m-4 flex gap-4 flex-wrap">
      {books.map(({ title, highlights, selected }, index) => (
        <BookListCard
          key={index}
          book={{ title, highlights, selected }}
          handleSelect={() => onSelect(index)}
        />
      ))}
    </div>
  );
};

export default BookList;
