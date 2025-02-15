import { cn } from '@/lib/utils';
import { useState } from 'react';

const TAB_INDEX = 0;

const heartBaseClasses = `
  h-[40px] w-[40px] 
  bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/66955/web_heart_animation.png')] 
  bg-no-repeat 
  bg-[length:2900%] 
  bg-left
  cursor-pointer 
  hover:scale-110 
  transition-transform
`;

type FavoriteHighlightProps = {
  onFavorite: (isFavorite: boolean) => void;
  isFavorite: boolean;
};

const FavoriteHighlight = ({
  onFavorite,
  isFavorite,
}: FavoriteHighlightProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleClick = () => {
    setShouldAnimate(!isFavorite);
    onFavorite(!isFavorite);
  };

  return (
    <div
      className={cn(
        heartBaseClasses,
        isFavorite && 'bg-right',
        shouldAnimate && isFavorite && 'animate-heart-burst'
      )}
      onClick={handleClick}
      role="button"
      tabIndex={TAB_INDEX}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    />
  );
};

export default FavoriteHighlight;
