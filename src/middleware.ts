import { isSessionValidApi } from '@/lib/auth/authHelpers';
import paths from '@/lib/constants/paths';
import { isCSRFAttackPattern, isProtectedRoute } from '@/lib/utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (
    request.method === 'GET' &&
    isProtectedRoute(request, paths) &&
    !(await isSessionValidApi(request))
  ) {
    return NextResponse.redirect(new URL(paths.login.pathname, request.url));
  }

  if (isCSRFAttackPattern(request)) {
    return new NextResponse(null, {
      status: 403,
    });
  }

  return NextResponse.next();
}
