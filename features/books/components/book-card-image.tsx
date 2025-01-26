import { ImageOff } from 'lucide-react';
import Image from 'next/image';
import DeleteBookBtn from './delete-book-btn';

type BookCardImageProps = {
  id: string;
  title: string;
  imageUrl: string | null;
};

const BookCardImage = ({ id, title, imageUrl }: BookCardImageProps) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="border p-1 h-fit">
        <div className="relative h-32 w-[6rem] p-2">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`${title} book cover`}
              layout="fill"
              placeholder="blur"
              blurDataURL={imageUrl}
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <ImageOff className="text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
      <DeleteBookBtn id={id} />
    </div>
  );
};

export default BookCardImage;
