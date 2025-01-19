'use client';
import { createI18nClient } from 'next-international/client';

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale,
} = createI18nClient({
  en: () => import('./en'),
  fr: () => import('./fr'),
  it: () => import('./it'),
  de: () => import('./de'),
  es: () => import('./es'),
});
