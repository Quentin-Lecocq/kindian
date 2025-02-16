const FavoritesLayout = ({
  children,
  books,
  highlights,
}: {
  children: React.ReactNode;
  books: React.ReactNode;
  highlights: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {children}
      {books}
      {highlights}
    </div>
  );
};
export default FavoritesLayout;
