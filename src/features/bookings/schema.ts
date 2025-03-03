import * as z from 'zod'

export const DatesColumnDataSchema = z.object({
  startDate: z
    .string()
    .datetime({ local: true })
    .transform(date => new Date(date)),
  endDate: z
    .string()
    .datetime({ local: true })
    .transform(date => new Date(date)),
  numNights: z.number().int().positive(),
})

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPaginationSchema = <TZodObject extends z.ZodObject<any>>(
  schema: TZodObject,
) =>
  z.object({
    columnName: schema.keyof(),
    range: z.object({
      startIndex: z.number(),
      endIndex: z.number(),
    }),
    numberOfItems: z.number(),
  })

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PaginationSchema<TZodObject extends z.ZodObject<any>> = ReturnType<
  typeof createPaginationSchema<TZodObject>
>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Pagination<TZodObject extends z.ZodObject<any>> = z.infer<
  PaginationSchema<TZodObject>
>
