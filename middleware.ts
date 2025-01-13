import { getToken } from 'next-auth/jwt';
import { createI18nMiddleware } from 'next-international/middleware';
import { NextRequest, NextResponse } from 'next/server';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  urlMappingStrategy: 'rewrite',
});

export async function middleware(req: NextRequest) {
  const publicRoutes = ['/export', '/api/auth'];

  if (publicRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    return I18nMiddleware(req);
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL('/export', req.url));
  }

  return I18nMiddleware(req);
}

export const config = {
  matcher: [
    '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)',
    '/dashboard/:path*',
  ],
};
