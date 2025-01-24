import TypographyH4 from '@/components/typography/typography-h4';
import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const HighlightsPage: NextPage = async () => {
  const t = await getScopedI18n('highlights_page');

  return (
    <>
      <TypographyH4>{t('title')}</TypographyH4>
    </>
  );
};

export default HighlightsPage;
