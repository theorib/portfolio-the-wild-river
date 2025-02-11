import {
  type IRateLimiterOptions,
  type RateLimiterRes,
} from 'rate-limiter-flexible'
import { type NextResponse } from 'next/server'
import { z } from 'zod'

export const NextRateLimiterOptionsSchema = z
  .object({
    keyPrefix: z.string(),
    points: z.number().positive(),
    duration: z.number().positive(),
    blockDuration: z.number().positive(),
    execEvenly: z.boolean(),
    execEvenlyMinDelayMs: z.number().positive(),
  })
  .partial()

export type NextRateLimiterOptions = IRateLimiterOptions

export type RateLimiterDefaultOptions = NextRateLimiterOptions & {
  points: number
  duration: number
}

export type NextRateLimiterResponse = NextResponse<{
  success: boolean
  message: string | undefined
}>

export type NextRateLimiterResponsePayload = {
  points: number
  duration: number
  success: boolean
  status: number
  message?: string
  rateLimiterRes: RateLimiterRes
}
