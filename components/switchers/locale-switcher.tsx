'use client';

import { useChangeLocale, useCurrentLocale } from '@/locales/clients';
import { locales } from '@/utils/locales';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const LocaleSwitcher = () => {
  const changeLocale = useChangeLocale();
  const locale = useCurrentLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <span className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all">
            {locale.toUpperCase()}
          </span>
          <span className="sr-only">Toggle locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale, index) => (
          <DropdownMenuItem
            key={index}
            className="cursor-pointer"
            onClick={() => changeLocale(locale)}
          >
            {locale.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LocaleSwitcher;
