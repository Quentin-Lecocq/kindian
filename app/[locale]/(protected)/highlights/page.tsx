import HighlightList from '@/features/highlights/components/highlight-list';
import SortControls from '@/features/highlights/components/sort-controls';
import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const HighlightsPage: NextPage = async () => {
  const t = await getScopedI18n('highlights_page');

  return (
    <>
      <h2 className="text-xl mb-6">{t('title')}</h2>
      <SortControls />
      <HighlightList />
    </>
  );
};

export default HighlightsPage;
