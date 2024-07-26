import { validateSession } from '@/lib/auth';
import { lucia } from '@/lib/auth/lucia';
import { errorCatalog } from '@/lib/constants/errorCatalog';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { user, session } = await validateSession();

  if (!user || !session) {
    // redirect(paths.login.path);
    return NextResponse.json({
      error: errorCatalog.INVALID_SESSION.message,
      success: false,
      status: 401,
    });
  }

  return NextResponse.json({
    data: { user, session },
    success: true,
    status: 200,
  });
}
