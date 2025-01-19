'use client';

import { useChangeLocale, useCurrentLocale } from '@/locales/clients';
import { Button } from './ui/button';

const ChangeLocale = () => {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <>
      <p>Current locale: {locale}</p>
      <Button
        variant="secondary"
        size="sm"
        disabled={locale === 'fr'}
        onClick={() => changeLocale('fr')}
      >
        FR
      </Button>
      <Button
        variant="secondary"
        size="sm"
        disabled={locale === 'en'}
        onClick={() => changeLocale('en')}
      >
        EN
      </Button>
    </>
  );
};

export default ChangeLocale;
