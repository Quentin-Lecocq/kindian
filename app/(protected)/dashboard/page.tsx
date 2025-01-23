import { signOut } from '@/app/(login)/actions';
import TypographyH4 from '@/components/typography/typography-h4';
import { Button } from '@/components/ui/button';
import { getUser } from '@/utils/user';
import { NextPage } from 'next';

const DashboardPage: NextPage = async () => {
  const user = await getUser();
  // const t = await getI18n();
  return (
    <>
      <TypographyH4>Dashboard</TypographyH4>
      <p>Hello {user?.email}</p>
      <form action={signOut}>
        <Button>Sign out</Button>
      </form>
    </>
  );
};

export default DashboardPage;
