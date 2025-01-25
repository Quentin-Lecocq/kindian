import { signOut } from '@/app/[locale]/(login)/actions';
import { Button } from '@/components/ui/button';
import { getScopedI18n } from '@/locales/server';
import { getUser } from '@/utils/user';
import { NextPage } from 'next';

const HomePage: NextPage = async () => {
  const t = await getScopedI18n('home_page');
  const user = await getUser();

  return (
    <>
      <h1 className="text-2xl">{t('title')}</h1>
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

export default HomePage;
