import {
  NextRateLimiter,
  type NextRateLimiterOptions,
  type NextRateLimiterResponse,
} from '@/features/nextRateLimiter'
import { type NextRequest } from 'next/server'

export async function POST(
  request: NextRequest,
): Promise<NextRateLimiterResponse> {
  const { ip, options = {} } = (await request.json()) as {
    ip: string
    options?: NextRateLimiterOptions
  }

  const validatedOptions = NextRateLimiter.validateOptions(options)
  const rateLimiter = NextRateLimiter.getInstance(validatedOptions)

  return rateLimiter.consume(ip)
}
