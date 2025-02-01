const Loading = () => {
  return (
    <>
      <h2 className="text-xl mb-6 animate-pulse bg-gray-200 h-8 w-48 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 space-y-3 animate-pulse"
          >
            <div className="h-48 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </>
  );
};

export default Loading;
