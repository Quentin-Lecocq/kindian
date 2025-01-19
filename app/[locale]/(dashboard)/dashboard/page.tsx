import TypographyH4 from '@/components/typography/typography-h4';
import { getI18n } from '@/locales/server';
import { NextPage } from 'next';

const DashboardPage: NextPage = async () => {
  const t = await getI18n();
  return (
    <>
      <TypographyH4>{t('hello.world')}</TypographyH4>
    </>
  );
};

export default DashboardPage;
