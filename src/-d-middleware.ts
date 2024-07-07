import { auth } from '@/auth';
import paths from '@/lib/paths';
// import { NextRequest } from 'next/server';

export default auth(async function middleware(req) {
  const nonAuthenticatedPaths = [paths.homePage(), paths.signInPage()];

  if (!req.auth && !nonAuthenticatedPaths.includes(req.nextUrl.pathname)) {
    const newUrl = new URL('/api/auth/signin', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
  // if (nonAuthenticatedPaths.includes(req.nextUrl.pathname)) {
  //   // redirect(paths.signInPage());
  // } else {
  //   redirect(paths.signInPage());
  // }
  // Your custom middleware logic goes here
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

// export { auth as middleware } from '@/auth';
