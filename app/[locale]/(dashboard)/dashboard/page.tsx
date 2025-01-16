import { NextPage } from 'next';
import { useTranslations } from 'next-intl';

const DashboardPage: NextPage = () => {
  const t = useTranslations('HomePage');
  return (
    <>
      <h1>{t('title')}</h1>
    </>
  );
};

export default DashboardPage;
