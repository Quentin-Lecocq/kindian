import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const HighlightsPage: NextPage = async () => {
  const t = await getScopedI18n('highlights_page');

  return (
    <>
      <h1 className="text-2xl">{t('title')}</h1>
    </>
  );
};

export default HighlightsPage;
