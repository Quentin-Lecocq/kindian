'use client';

type LoadMoreProps = {
  onClick: () => void;
  isLoading: boolean;
};

const LoadMore = ({ isLoading, onClick }: LoadMoreProps) => {
  return (
    <button onClick={onClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Load more'}
    </button>
  );
};

export default LoadMore;
