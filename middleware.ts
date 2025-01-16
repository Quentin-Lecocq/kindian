import { clerkMiddleware } from '@clerk/nextjs/server';
import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest } from 'next/server';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
});

export default clerkMiddleware();

export async function middleware(req: NextRequest) {
  const publicRoutes = ['/export', '/api/auth'];

  if (publicRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return I18nMiddleware(req);
  }

  return I18nMiddleware(req);
}

export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)',
    '/dashboard/:path*',
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
