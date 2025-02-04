import { ImageOff } from 'lucide-react';
import Image from 'next/image';

type BookCardImageProps = {
  title: string;
  imageUrl: string | null;
};

const BookCardImage = ({ title, imageUrl }: BookCardImageProps) => {
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
      {/* <DeleteBook id={id} onOptimisticDelete={onOptimisticDelete} /> */}
    </div>
  );
};

export default BookCardImage;
