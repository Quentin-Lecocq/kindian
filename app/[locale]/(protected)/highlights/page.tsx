import { getHighlights } from '@/features/highlights/actions/highlights';
import HighlightsListWrapper from '@/features/highlights/components/highlights-list-wrapper';
import { getScopedI18n } from '@/locales/server';

const HighlightsPage = async () => {
  const t = await getScopedI18n('highlights_page');
  const initialData = await getHighlights();

  return (
    <>
      <h2 className="text-xl mb-6">{t('title')}</h2>
      <HighlightsListWrapper initialData={initialData} />
    </>
  );
};

export default HighlightsPage;
