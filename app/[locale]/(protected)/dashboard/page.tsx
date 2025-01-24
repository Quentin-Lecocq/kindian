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
      <h1 className="xl:text-4xl text-3xl">This is my title dashboard</h1>
      <p className="text-muted-foreground text-sm mt-4">
        This is my text dashboard
      </p>
      <p className="text-destructive text-sm mt-4">
        This is my destructive text
      </p>
      <br />
      <h2 className="text-sm font-regular">This is my subtitle dashboard</h2>
      <br />
      <p>Hello {user?.email}</p>
      <form action={signOut}>
        <Button>Sign out</Button>
      </form>
    </>
  );
};

export default DashboardPage;
