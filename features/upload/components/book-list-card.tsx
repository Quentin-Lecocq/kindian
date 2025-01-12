import { LucideCircleCheck } from 'lucide-react';
import Image from 'next/image';
import { Book } from '../type';

type BookListCardProps = {
  book: Book;
  handleSelect: () => void;
};

const BookListCard = ({ book, handleSelect }: BookListCardProps) => {
  const { title, highlights, selected, coverUrl } = book;

  console.log(coverUrl);

  return (
    <div
      className="border w-32 rounded-md cursor-pointer relative"
      onClick={handleSelect}
    >
      <div className="relative h-28 flex rounded-t-md items-center justify-center bg-gray-600">
        <Image src={coverUrl ?? '/assets/book-cover.png'} alt={title} fill />
      </div>
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
