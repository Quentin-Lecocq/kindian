import { getFavoritesHighlights } from '@/features/highlights/actions/highlights';

const FavoritesHighlightsSection = async () => {
  const favoritesHighlights = await getFavoritesHighlights();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-md font-medium">Favorites Highlights</h1>
      <div className="flex flex-col gap-4">
        {favoritesHighlights.map(({ id, content }) => (
          <div key={id} className="border rounded-md p-4">
            <h2 className="text-sm font-medium">{content}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesHighlightsSection;
