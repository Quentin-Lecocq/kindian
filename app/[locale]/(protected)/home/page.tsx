import Greetings from '@/features/home/component/greetings';
import LastBook from '@/features/home/component/last-book';
import { getScopedI18n } from '@/locales/server';
import { getUser } from '@/utils/user';
import { NextPage } from 'next';

const IDENTITY_INDEX = 1;
const DEFAULT_NAME = 'no name';

const HomePage: NextPage = async () => {
  const t = await getScopedI18n('home_page');
  const user = await getUser();
  const name =
    user?.identities?.[IDENTITY_INDEX]?.identity_data?.full_name ??
    DEFAULT_NAME;

  return (
    <>
      <h2 className="text-xl mb-6">{t('title')}</h2>
      <Greetings name={name} />
      <LastBook />
    </>
  );
};

export default HomePage;
