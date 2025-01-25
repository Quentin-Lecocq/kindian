import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const FavoritesPage: NextPage = async () => {
  const t = await getScopedI18n('favorites_page');

  return (
    <>
      <h1 className="text-2xl">{t('title')}</h1>
    </>
  );
};

export default FavoritesPage;
