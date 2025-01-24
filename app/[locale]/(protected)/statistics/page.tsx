import TypographyH4 from '@/components/typography/typography-h4';
import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const StatisticsPage: NextPage = async () => {
  const t = await getScopedI18n('statistics_page');

  return (
    <>
      <TypographyH4>{t('title')}</TypographyH4>
    </>
  );
};

export default StatisticsPage;
