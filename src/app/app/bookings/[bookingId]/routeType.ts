import { type DynamicRoute } from 'next-typesafe-url'
import { z } from 'zod'

export const Route = {
  routeParams: z.object({
    bookingId: z.number(),
  }),
  // searchParams: z.object({
  //   location: z.enum(["us", "eu"]).optional(),
  //   userInfo: z.object({
  //     name: z.string(),
  //     age: z.number(),
  //   }),
  // }),
} satisfies DynamicRoute
export type RouteType = typeof Route
