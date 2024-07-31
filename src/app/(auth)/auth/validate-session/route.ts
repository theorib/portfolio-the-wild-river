import { validateSession } from '@/lib/auth';
import {
  ValidateSessionApiResponse,
  validateSessionClient,
  ValidateSessionErrorResult,
  ValidateSessionSuccessResult,
} from '@/lib/auth/authHelpers';
import { lucia } from '@/lib/auth/lucia';
import { errorCatalog } from '@/lib/constants/errorCatalog';
import { NextRequest, NextResponse } from 'next/server';

export type ValidateSessionApiResult = Promise<
  NextResponse<ValidateSessionApiResponse>
>;

export async function GET(request: NextRequest): ValidateSessionApiResult {
  const data = await validateSession();

  if (!data.isSuccess) {
    // redirect(paths.login.path);
    return NextResponse.json({
      data,
      success: false,
      status: 401,
    });
  }

  return NextResponse.json({
    data,
    success: true,
    status: 200,
  });
}
