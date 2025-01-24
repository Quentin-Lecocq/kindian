import { signOut } from '@/app/[locale]/(login)/actions';
import TypographyH4 from '@/components/typography/typography-h4';
import { Button } from '@/components/ui/button';
import { getScopedI18n } from '@/locales/server';
import { getUser } from '@/utils/user';
import { NextPage } from 'next';

const DashboardPage: NextPage = async () => {
  const t = await getScopedI18n('dashboard_page');
  const user = await getUser();

  return (
    <>
      <TypographyH4>{t('title')}</TypographyH4>
      <p>Hello {user?.email}</p>
      <form action={signOut}>
        <Button>Sign out</Button>
      </form>
    </>
  );
};

export default DashboardPage;
