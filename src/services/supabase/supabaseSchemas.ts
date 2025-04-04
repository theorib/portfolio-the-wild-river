/*
 * ==========================================
 * |          GENERATED BY SUPAZOD          |
 * ==========================================
 */

import { z } from 'zod'
import { type Json } from './supabase.auto.types'

export const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.record(z.union([jsonSchema, z.undefined()])),
      z.array(jsonSchema),
    ])
    .nullable(),
)

export const publicBookingsRowSchemaSchema = z.object({
  cabinId: z.number().nullable(),
  cabinPrice: z.number().nullable(),
  created_at: z.string(),
  endDate: z.string().nullable(),
  extrasPrice: z.number().nullable(),
  guestId: z.number().nullable(),
  hasBreakfast: z.boolean().nullable(),
  id: z.number(),
  isPaid: z.boolean().nullable(),
  numGuests: z.number().nullable(),
  numNights: z.number().nullable(),
  observations: z.string().nullable(),
  startDate: z.string().nullable(),
  status: z.string().nullable(),
  totalPrice: z.number().nullable(),
})

export const publicBookingsInsertSchemaSchema = z.object({
  cabinId: z.number().optional().nullable(),
  cabinPrice: z.number().optional().nullable(),
  created_at: z.string().optional(),
  endDate: z.string().optional().nullable(),
  extrasPrice: z.number().optional().nullable(),
  guestId: z.number().optional().nullable(),
  hasBreakfast: z.boolean().optional().nullable(),
  id: z.number().optional(),
  isPaid: z.boolean().optional().nullable(),
  numGuests: z.number().optional().nullable(),
  numNights: z.number().optional().nullable(),
  observations: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
})

export const publicBookingsUpdateSchemaSchema = z.object({
  cabinId: z.number().optional().nullable(),
  cabinPrice: z.number().optional().nullable(),
  created_at: z.string().optional(),
  endDate: z.string().optional().nullable(),
  extrasPrice: z.number().optional().nullable(),
  guestId: z.number().optional().nullable(),
  hasBreakfast: z.boolean().optional().nullable(),
  id: z.number().optional(),
  isPaid: z.boolean().optional().nullable(),
  numGuests: z.number().optional().nullable(),
  numNights: z.number().optional().nullable(),
  observations: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  totalPrice: z.number().optional().nullable(),
})

export const publicBookingsRelationshipsSchemaSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal('bookings_cabinId_fkey'),
    columns: z.tuple([z.literal('cabinId')]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal('cabins'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
  z.object({
    foreignKeyName: z.literal('bookings_guestId_fkey'),
    columns: z.tuple([z.literal('guestId')]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal('guests'),
    referencedColumns: z.tuple([z.literal('id')]),
  }),
])

export const publicCabinsRowSchemaSchema = z.object({
  created_at: z.string(),
  description: z.string().nullable(),
  discount: z.number().nullable(),
  id: z.number(),
  image: z.string().nullable(),
  maxCapacity: z.number().nullable(),
  name: z.string().nullable(),
  regularPrice: z.number().nullable(),
})

export const publicCabinsInsertSchemaSchema = z.object({
  created_at: z.string().optional(),
  description: z.string().optional().nullable(),
  discount: z.number().optional().nullable(),
  id: z.number().optional(),
  image: z.string().optional().nullable(),
  maxCapacity: z.number().optional().nullable(),
  name: z.string().optional().nullable(),
  regularPrice: z.number().optional().nullable(),
})

export const publicCabinsUpdateSchemaSchema = z.object({
  created_at: z.string().optional(),
  description: z.string().optional().nullable(),
  discount: z.number().optional().nullable(),
  id: z.number().optional(),
  image: z.string().optional().nullable(),
  maxCapacity: z.number().optional().nullable(),
  name: z.string().optional().nullable(),
  regularPrice: z.number().optional().nullable(),
})

export const publicCabinsRelationshipsSchemaSchema = z.tuple([])

export const publicGuestsRowSchemaSchema = z.object({
  countryFlag: z.string().nullable(),
  created_at: z.string(),
  email: z.string().nullable(),
  fullName: z.string().nullable(),
  id: z.number(),
  nationalID: z.string().nullable(),
  nationality: z.string().nullable(),
})

export const publicGuestsInsertSchemaSchema = z.object({
  countryFlag: z.string().optional().nullable(),
  created_at: z.string().optional(),
  email: z.string().optional().nullable(),
  fullName: z.string().optional().nullable(),
  id: z.number().optional(),
  nationalID: z.string().optional().nullable(),
  nationality: z.string().optional().nullable(),
})

export const publicGuestsUpdateSchemaSchema = z.object({
  countryFlag: z.string().optional().nullable(),
  created_at: z.string().optional(),
  email: z.string().optional().nullable(),
  fullName: z.string().optional().nullable(),
  id: z.number().optional(),
  nationalID: z.string().optional().nullable(),
  nationality: z.string().optional().nullable(),
})

export const publicGuestsRelationshipsSchemaSchema = z.tuple([])

export const publicSettingsRowSchemaSchema = z.object({
  breakfastPrice: z.number().nullable(),
  created_at: z.string(),
  id: z.number(),
  maxBookingLength: z.number().nullable(),
  maxGuestsPerBooking: z.number().nullable(),
  minBookingLength: z.number().nullable(),
})

export const publicSettingsInsertSchemaSchema = z.object({
  breakfastPrice: z.number().optional().nullable(),
  created_at: z.string().optional(),
  id: z.number().optional(),
  maxBookingLength: z.number().optional().nullable(),
  maxGuestsPerBooking: z.number().optional().nullable(),
  minBookingLength: z.number().optional().nullable(),
})

export const publicSettingsUpdateSchemaSchema = z.object({
  breakfastPrice: z.number().optional().nullable(),
  created_at: z.string().optional(),
  id: z.number().optional(),
  maxBookingLength: z.number().optional().nullable(),
  maxGuestsPerBooking: z.number().optional().nullable(),
  minBookingLength: z.number().optional().nullable(),
})

export const publicSettingsRelationshipsSchemaSchema = z.tuple([])
