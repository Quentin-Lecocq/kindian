import TypographyH4 from '@/components/typography/typography-h4';
import { Button } from '@/components/ui/button';
import { getUser } from '@/queries/user';
import { createClient } from '@/utils/supabase/server';
import { NextPage } from 'next';
import { redirect } from 'next/navigation';

const signOut = async () => {
  'use server';

  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
  }
  redirect('/sign-in');
};

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
