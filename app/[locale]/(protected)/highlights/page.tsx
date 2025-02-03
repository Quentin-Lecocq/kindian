import HighlightItem from '@/features/highlights/components/highlight-item';
import { HighlightWithTagsAndNotes } from '@/features/highlights/types/types';
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

const getHighlights = async (): Promise<HighlightWithTagsAndNotes[]> => {
  try {
    const highlights = await prisma.highlight.findMany({
      orderBy: {
        addedAt: 'asc',
      },
      include: {
        highlightTags: {
          include: {
            tag: true,
          },
          orderBy: {
            tag: {
              createdAt: 'desc',
            },
          },
        },
        notes: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    return highlights;
  } catch (error) {
    console.error('Error fetching highlights:', error);
    return [];
  }
};
