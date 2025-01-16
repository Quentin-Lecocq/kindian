import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// const int1Middleware = createMiddleware(routing);

// const isPublicRoute = createRouteMatcher([
//   '/sign-in(.*)',
//   '/sign-up(.*)',
//   '/new-user',
// ]);

const isProtectedRoute = createRouteMatcher([
  '/dashboard',
  '/books',
  '/export',
  '/favorites',
  '/highlights',
  '/statistics',
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();

  // return int1Middleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    '/',
    '/(fr|en|es|it)/:path*',
  ],
};
