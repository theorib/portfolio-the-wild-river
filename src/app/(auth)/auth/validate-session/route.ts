import { validateSession } from '@/lib/auth';
import { ValidateSessionApiResponse } from '@/lib/auth/authHelpers';
import { NextRequest, NextResponse } from 'next/server';

export type ValidateSessionApiResult = Promise<
  NextResponse<ValidateSessionApiResponse>
>;

export async function GET(request: NextRequest): ValidateSessionApiResult {
  const data = await validateSession();

  if (!data.isSuccess) {
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
