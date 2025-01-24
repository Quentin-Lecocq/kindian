import { updateSession } from '@/features/auth/lib/supabase/middleware';
import { createI18nMiddleware } from 'next-international/middleware';
import { type NextRequest } from 'next/server';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
});

const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.includes('.') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/')
  ) {
    return;
  }

  if (!publicRoutes.includes(pathname)) {
    await updateSession(req);
  }

  // // D'abord mettre à jour la session
  // const sessionResponse = await updateSession(req);
  // if (!sessionResponse.ok) {
  //   return sessionResponse;
  // }

  // Ensuite appliquer le middleware i18n
  return I18nMiddleware(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    '/api/(.*)',
  ],
};
