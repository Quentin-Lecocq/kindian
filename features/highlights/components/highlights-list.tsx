'use client';

import { PaginatedHighlights } from '../actions/highlights';
import { useHighlights } from '../hooks/use-highlights';
import HighlightItem from './highlight-item';
import LoadMore from './load-more';

type HighlightsListProps = {
  initialData: PaginatedHighlights;
};

const HighlightsList = ({ initialData }: HighlightsListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useHighlights(initialData);

  return (
    <>
      <div className="flex flex-col gap-10">
        {data.pages.map((page) =>
          page.highlights.map((highlight) => (
            <HighlightItem key={highlight.id} highlight={highlight} />
          ))
        )}
      </div>
      {hasNextPage && (
        <LoadMore
          isLoading={isFetchingNextPage}
          onClick={() => fetchNextPage()}
        />
      )}
    </>
  );
};

export default HighlightsList;
