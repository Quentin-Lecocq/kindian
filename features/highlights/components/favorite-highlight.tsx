'use client';

import { cn } from '@/lib/utils';
import { startTransition, useOptimistic, useState } from 'react';
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

type FavoriteHighlightProps = {
  id: string;
  isFavorite: boolean;
};

const FavoriteHighlight = ({ id, isFavorite }: FavoriteHighlightProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const [optimisticIsFavorite, addOptimisticAction] = useOptimistic(
    isFavorite,
    (state: boolean) => {
      return !state;
    }
  );

  const handleClick = () => {
    setShouldAnimate(!isFavorite);
    startTransition(() => {
      addOptimisticAction(!isFavorite);
    });
    favoriteHighlight(id, !isFavorite);
  };

  return (
    <div
      className={cn(
        heartBaseClasses,
        optimisticIsFavorite && 'bg-right',
        shouldAnimate && optimisticIsFavorite && 'animate-heart-burst'
      )}
      onClick={handleClick}
      role="button"
      tabIndex={TAB_INDEX}
      aria-label={
        optimisticIsFavorite ? 'Remove from favorites' : 'Add to favorites'
      }
    />
  );
};

export default FavoriteHighlight;
