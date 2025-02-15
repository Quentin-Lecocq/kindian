'use client';

import { PaginatedHighlights } from '../actions/highlights';
import { useHighlights } from '../hooks/use-highlights';
import HighlightItem from './highlight-item';
import InfiniteScroll from './infinite-scroll';

type HighlightsListProps = {
  initialData: PaginatedHighlights;
};

const HighlightsList = ({ initialData }: HighlightsListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useHighlights(initialData);

  if (!data?.pages) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10">
      {data.pages.map((page) =>
        page.highlights.map((highlight) => (
          <HighlightItem key={highlight.id} highlight={highlight} />
        ))
      )}
      {hasNextPage && (
        <InfiniteScroll
          onIntersect={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
        />
      )}
    </div>
  );
};

export default HighlightsList;
