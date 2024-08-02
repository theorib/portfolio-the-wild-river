import {
  NextRateLimiter,
  NextRateLimiterOptions,
  NextRateLimiterResponse,
} from '@/lib/nextRateLimiter';
import { NextRequest } from 'next/server';

export async function POST(
  request: NextRequest,
): Promise<NextRateLimiterResponse> {
  const { ip, options = {} }: { ip: string; options?: NextRateLimiterOptions } =
    await request.json();

  const validatedOptions = NextRateLimiter.validateOptions(options);
  const rateLimiter = NextRateLimiter.getInstance(validatedOptions);

  return rateLimiter.consume(ip);
}
