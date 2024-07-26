import paths from '@/lib/constants/paths';
import { isCSRFAttackPattern, isProtectedRoute } from '@/lib/utils';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const validateSessionViaApi = async function (request: NextRequest) {
  const response = await fetch(
    `${request.nextUrl.origin}/auth/validate-session`,
    {
      method: 'GET',
      headers: {
        Cookie: request.headers.get('Cookie') || '',
      },
    },
  );
  const data = await response.json();

  return data;
};

const isSessionValid = async function (request: NextRequest): Promise<boolean> {
  const { success } = await validateSessionViaApi(request);

  return success;
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (
    request.method === 'GET' &&
    isProtectedRoute(request, paths) &&
    !(await isSessionValid(request))
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
