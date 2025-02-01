'use client';

import { useHighlightList } from '../hooks/use-highlight-list';
import HighlightItem from './highlight-item';

const HighlightList = () => {
  const { highlights, isLoading, error, handlers } = useHighlightList();
  console.log('render');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (highlights?.length === 0) return <div>No highlights found</div>;

  return (
    <>
      <div className="flex flex-col gap-10">
        {highlights?.map((highlight) => (
          <HighlightItem
            key={highlight.id}
            highlight={highlight}
            {...handlers}
          />
        ))}
      </div>
    </>
  );
};

export default HighlightList;
