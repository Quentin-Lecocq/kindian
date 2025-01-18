import TypographyH4 from '@/components/typography/typography-h4';
import { Button } from '@/components/ui/button';
import { NextPage } from 'next';

const DashboardPage: NextPage = () => {
  return (
    <>
      <TypographyH4>Dashboard</TypographyH4>
      <form action="/api/test-google-books">
        <Button>TEST GOOGLE BOOKS API</Button>
      </form>
    </>
  );
};

export default DashboardPage;
