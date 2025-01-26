import { MAX_DESCRIPTION_LENGTH } from '../utils/constants';

type BookCardInfoProps = {
  title: string;
  author: string;
  description: string | null;
};

const BookCardInfo = ({ title, author, description }: BookCardInfoProps) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="mt-2">
        <p className="text-md font-semibold truncate">{title}</p>
        <p className="text-sm text-muted-foreground">
          By <span className="underline">{author}</span>
        </p>
      </div>
      <div className="mt-4">
        {description && (
          <p className="text-xs">
            {description.slice(0, MAX_DESCRIPTION_LENGTH)}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookCardInfo;
