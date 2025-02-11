/**
 * The `NextRateLimiter` class is a singleton that provides rate limiting functionality for an application.
 * It uses the `rate-limiter-flexible` library to manage the rate limiting logic.
 *
 * The `NextRateLimiter` class has the following features:
 * - Singleton pattern to ensure only one instance is created
 * - Configurable options for the rate limiting, such as the number of points and duration
 * - Ability to consume a rate limit and return a response with the necessary headers
 * - Error handling for rate limiting errors and other application errors
 *
 * The `NextRateLimiter` class is designed to be used in a Next.js application, as it uses the `NextResponse` object to return the rate limiting response.
 */
import { RateLimiterMemory, type RateLimiterRes } from 'rate-limiter-flexible'
import { NextResponse } from 'next/server'
import { AppError } from '@/lib/errors'
import { fromError } from 'zod-validation-error'
import {
  type RateLimiterDefaultOptions,
  type NextRateLimiterOptions,
  NextRateLimiterOptionsSchema,
  type NextRateLimiterResponse,
  type NextRateLimiterResponsePayload,
} from '@/lib/nextRateLimiter/types'
import { messageCatalog } from '@/lib/constants/messageCatalog'
import { errorCatalog } from '@/lib/constants/errorCatalog'

export class NextRateLimiter {
  private static instance: NextRateLimiter
  private limiter: RateLimiterMemory
  private options: NextRateLimiterOptions

  private constructor(options: Partial<NextRateLimiterOptions> = {}) {
    this.options = { ...NextRateLimiter.defaultOptions, ...options }
    this.limiter = new RateLimiterMemory(this.options)
  }

  static getInstance(
    options?: Partial<NextRateLimiterOptions>,
  ): NextRateLimiter {
    if (!NextRateLimiter.instance) {
      NextRateLimiter.instance = new NextRateLimiter(options)
    }
    return NextRateLimiter.instance
  }

  static get defaultOptions(): RateLimiterDefaultOptions {
    return {
      points: 100,
      duration: 60,
    }
  }

  async consume(ip: string): Promise<NextRateLimiterResponse> {
    try {
      if (!ip) throw new AppError('RATE_LIMITER_IP_ERROR')
      const rateLimiterRes = await this.limiter.consume(ip)
      return this.createResponse({
        success: true,
        points: this.options.points ?? NextRateLimiter.defaultOptions.points,
        duration:
          this.options.duration ?? NextRateLimiter.defaultOptions.duration,
        status: messageCatalog.REQUEST_SUCCESSFUL.code,
        message: messageCatalog.REQUEST_SUCCESSFUL.message,
        rateLimiterRes,
      })
    } catch (error) {
      if (this.isNextRateLimiterResponse(error)) {
        return this.createResponse({
          success: false,
          points: this.options.points ?? NextRateLimiter.defaultOptions.points,
          duration:
            this.options.duration ?? NextRateLimiter.defaultOptions.duration,
          status: errorCatalog.TOO_MANY_REQUESTS.code,
          message: errorCatalog.TOO_MANY_REQUESTS.message,
          rateLimiterRes: error,
        })
      }
      throw error instanceof AppError
        ? error
        : new AppError('RATE_LIMITER_ERROR', { cause: error })
    }
  }

  private createResponse(
    options: NextRateLimiterResponsePayload,
  ): NextRateLimiterResponse {
    const { points, duration, success, status, message, rateLimiterRes } =
      options
    const retryAfter = Math.round(rateLimiterRes.msBeforeNext / 1000) || 1

    return NextResponse.json(
      { success, message },
      {
        status,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': points.toString(),
          'X-RateLimit-Remaining': rateLimiterRes.remainingPoints.toString(),
          'X-RateLimit-Reset': new Date(
            Date.now() + duration * 1000,
          ).toISOString(),
        },
      },
    )
  }

  private isNextRateLimiterResponse(
    rateLimiterRes: unknown,
  ): rateLimiterRes is RateLimiterRes {
    return (
      typeof rateLimiterRes === 'object' &&
      rateLimiterRes !== null &&
      'msBeforeNext' in rateLimiterRes
    )
  }

  static validateOptions(
    options?: Partial<NextRateLimiterOptions>,
  ): NextRateLimiterOptions {
    const validatedOptions = NextRateLimiterOptionsSchema.safeParse(options)
    if (!validatedOptions.success) {
      throw new AppError('RATE_LIMITER_OPTIONS_ERROR', {
        cause: fromError(validatedOptions.error),
      })
    }
    return { ...NextRateLimiter.defaultOptions, ...validatedOptions.data }
  }
}
