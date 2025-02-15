import { z } from 'zod'

export const CabinsSchema = z.object({
  name: z.string(),
  maxCapacity: z.number().int().positive(),
  regularPrice: z.number().positive(),
  discount: z.number().min(0).max(100),
  image: z.string().url(),
  description: z.string(),
})
export const CabinsArraySchema = z.array(CabinsSchema)

// Inferred TypeScript types
export type Cabin = z.infer<typeof CabinsSchema>
export type Cabins = z.infer<typeof CabinsArraySchema>

export const BookingSchema = z.object({
  created_at: z.string().datetime(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  cabinId: z.number().int().positive(),
  guestId: z.number().int().positive(),
  hasBreakfast: z.boolean(),
  observations: z.string(),
  isPaid: z.boolean(),
  numGuests: z.number().int().positive(),
})

export const BookingsArraySchema = z.array(BookingSchema)

// Inferred TypeScript types
export type Booking = z.infer<typeof BookingSchema>
export type Bookings = z.infer<typeof BookingsArraySchema>

export const GuestSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  nationality: z.string().min(1),
  nationalID: z.string().min(1),
  countryFlag: z.string().url(),
})

export const GuestsArraySchema = z.array(GuestSchema)

// Inferred TypeScript types
export type Guest = z.infer<typeof GuestSchema>
export type Guests = z.infer<typeof GuestsArraySchema>
