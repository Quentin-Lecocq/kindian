import { getHighlights } from '@/features/highlights/actions/highlights';
import HighlightsList from '@/features/highlights/components/highlights-list';
import { getScopedI18n } from '@/locales/server';

const HighlightsPage = async () => {
  const t = await getScopedI18n('highlights_page');
  const initialData = await getHighlights();

  return (
    <>
      <h2 className="text-xl mb-6">{t('title')}</h2>
      <HighlightsList initialData={initialData} />
    </>
  );
};

export default HighlightsPage;
