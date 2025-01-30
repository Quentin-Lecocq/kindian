import { cn } from '@/lib/utils';
import { useState } from 'react';

const heartBaseClasses = `
  h-[50px] w-[50px] 
  bg-[url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/66955/web_heart_animation.png')] 
  bg-no-repeat 
  bg-[length:2900%] 
  bg-left
  cursor-pointer 
  hover:scale-110 
  transition-transform
`;

type FavoriteHighlightButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
};

const FavoriteHighlightButton = ({
  isFavorite,
  onToggle,
}: FavoriteHighlightButtonProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleClick = () => {
    setShouldAnimate(!isFavorite);
    onToggle();
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
      tabIndex={0}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    />
  );
};

export default FavoriteHighlightButton;
