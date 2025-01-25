import { getScopedI18n } from '@/locales/server';
import { NextPage } from 'next';

const FavoritesPage: NextPage = async () => {
  const t = await getScopedI18n('favorites_page');

  return (
    <>
      <h2 className="text-xl mb-6">{t('title')}</h2>
    </>
  );
};

export default FavoritesPage;
