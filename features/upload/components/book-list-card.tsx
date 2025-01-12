import { LucideCircleCheck } from 'lucide-react';
import { FC } from 'react';
import { Book } from '../type';

type BookListCardProps = {
  book: Book;
  handleSelect: () => void;
};

const BookListCard: FC<BookListCardProps> = ({ book, handleSelect }) => {
  const { title, highlights, selected } = book;

  return (
    <div
      className="border w-40 rounded-md cursor-pointer relative"
      onClick={handleSelect}
    >
      <div className="flex flex-col gap-1 p-2 bg-slate-50 rounded-b-md text-gray-900">
        <p className="text-sm truncate">{title}</p>
        <p className="text-xs">{highlights.length} highlights</p>
      </div>
      {selected && (
        <div className="absolute top-1 right-1 rounded-full">
          <LucideCircleCheck className="text-emerald-500" />
        </div>
      )}
    </div>
  );
};

export default BookListCard;
