import HighlightItem from '@/features/highlights/components/highlight-item';
import { prisma } from '@/lib/prisma';
import { getScopedI18n } from '@/locales/server';

const HighlightsPage = async () => {
  const t = await getScopedI18n('highlights_page');
  const highlights = await getHighlights();

  return (
    <>
      <h2 className="text-xl mb-6">{t('title')}</h2>
      <div className="flex flex-col gap-10">
        {highlights?.map((highlight) => (
          <HighlightItem key={highlight.id} highlight={highlight} />
        ))}
      </div>
    </>
  );
};

export default HighlightsPage;

const getHighlights = async () => {
  try {
    const highlights = await prisma.highlight.findMany();
    return highlights;
  } catch (error) {
    console.error('Error fetching highlights:', error);
    return [];
  }
};
