'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { favoriteHighlight } from '../actions/highlights';

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

type FavoriteHighlightIconProps = {
  id: string;
  isFavorite: boolean;
};

const FavoriteHighlightIcon = ({
  id,
  isFavorite,
}: FavoriteHighlightIconProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handleClick = () => {
    setShouldAnimate(!isFavorite);
    favoriteHighlight(id, !isFavorite);
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

export default FavoriteHighlightIcon;
