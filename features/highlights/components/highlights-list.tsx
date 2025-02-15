'use client';

import { useState } from 'react';
import { getHighlights, PaginatedHighlights } from '../actions/highlights';
import { HighlightWithTagsAndNotes } from '../types/types';
import HighlightItem from './highlight-item';
import LoadMore from './load-more';

type HighlightsListProps = {
  initialData: PaginatedHighlights;
};

const HighlightsList = ({ initialData }: HighlightsListProps) => {
  const [highlights, setHighlights] = useState<HighlightWithTagsAndNotes[]>(
    initialData.highlights
  );
  const [hasMore, setHasMore] = useState<boolean>(initialData.hasMore);
  const [cursor, setCursor] = useState<string | undefined>(
    initialData.nextCursor
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLoadMore = () => {
    if (isLoading) return;

    setIsLoading(true);
    getHighlights(cursor)
      .then((result) => {
        setHighlights([...highlights, ...result.highlights]);
        setHasMore(result.hasMore);
        setCursor(result.nextCursor);
      })
      .catch((error) => {
        console.error('Error loading more highlights:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="flex flex-col gap-10">
        {highlights.map((highlight) => (
          // <p key={highlight.id}>
          //   {highlight.bookTitle} {highlight.id}
          // </p>
          <HighlightItem key={highlight.id} highlight={highlight} />
        ))}
      </div>
      {hasMore && <LoadMore isLoading={isLoading} onClick={handleLoadMore} />}
    </>
  );
};

export default HighlightsList;
