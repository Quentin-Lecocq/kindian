'use client';

import { useEffect, useRef } from 'react';

type InfiniteScrollProps = {
  onIntersect: () => void;
  isLoading: boolean;
};

const InfiniteScroll = ({ onIntersect, isLoading }: InfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          onIntersect();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [onIntersect, isLoading]);

  return (
    <div className="h-10" ref={observerRef}>
      {isLoading && (
        <div className="text-center text-sm">Loading more highlights...</div>
      )}
    </div>
  );
};

export default InfiniteScroll;
