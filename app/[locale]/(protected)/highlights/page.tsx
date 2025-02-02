import HighlightList from '@/features/highlights/components/highlight-list';
import SortControls from '@/features/highlights/components/sort-controls';
import { prisma } from '@/lib/prisma';
import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const getHighlights = async () => {
  try {
    const highlights = await prisma.highlight.findMany();
    return highlights;
  } catch (error) {
    console.error('Error fetching highlights:', error);
    return [];
  }
};

const HighlightsPage: NextPage = async () => {
  const t = await getScopedI18n('highlights_page');
  const highlights = await getHighlights();

  return (
    <>
      <h2 className="text-xl mb-6">{t('title')}</h2>
      <SortControls />
      <HighlightList highlights={highlights} />
    </>
  );
};

export default HighlightsPage;
