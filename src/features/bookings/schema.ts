import * as z from 'zod'

export const BookingsStatusSchema = z.union([
  z.literal('checked-out'),
  z.literal('checked-in'),
  z.literal('unconfirmed'),
])
export type BookingsStatus = z.output<typeof BookingsStatusSchema>

export const BookingsStatusFilterSchema = BookingsStatusSchema.or(
  z.literal('all'),
)

export type BookingsStatusFilter = z.output<typeof BookingsStatusFilterSchema>

export const BookingsSortSchema = z.union([
  z.literal('startDate-desc'),
  z.literal('startDate-asc'),
  z.literal('totalPrice-desc'),
  z.literal('totalPrice-asc'),
])
export type BookingsSort = z.output<typeof BookingsSortSchema>

export const BookingsPageSchema = z.number().int().positive()
export type BookingsPage = z.output<typeof BookingsPageSchema>
