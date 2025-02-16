const FavoritesLayout = ({
  books,
  highlights,
}: {
  books: React.ReactNode;
  highlights: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">{books}</div>
        <div className="col-span-2">{highlights}</div>
      </div>
    </div>
  );
};
export default FavoritesLayout;
