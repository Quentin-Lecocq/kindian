import BookCover from '@/features/upload/assets/book-cover.png';
import { LucideCircleCheck } from 'lucide-react';
import Image from 'next/image';
import { Book } from '../type';

type BookListCardProps = {
  book: Book;
  handleSelect: () => void;
};

const BookListCard = ({ book, handleSelect }: BookListCardProps) => {
  const { title, highlights, selected } = book;

  return (
    <div
      className="border w-40 rounded-md cursor-pointer relative"
      onClick={handleSelect}
    >
      <div className="flex rounded-t-md items-center justify-center bg-gray-600 pb-2">
        <Image src={BookCover} alt={title} width={80} height={80} />
      </div>
      {/* <input
        type="checkbox"
        className={selected ? 'accent-emerald-500' : ''}
        checked={selected}
      /> */}
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
