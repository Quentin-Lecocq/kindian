import { getFavoritesBooks } from '@/features/books/actions/books';

const FavoritesBooksSection = async () => {
  const favoritesBooks = await getFavoritesBooks();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-md font-medium">Favorites Books</h1>
      <div className="flex flex-col gap-4">
        {favoritesBooks.map(({ id, title, author }) => (
          <div
            className="border hover:bg-accent transition-all p-4 text-sm"
            key={id}
          >
            <p>{title}</p>
            <p className="text-xs italic text-foreground/50">{author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesBooksSection;
