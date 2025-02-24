'use client'
import { type Booking } from '@/services/supabase/supabase.types'
import { createColumnHelper } from '@tanstack/react-table'

const columnHelper = createColumnHelper<Booking>()

export const bookingsColumns = [
  columnHelper.accessor('cabinId', {
    header: 'Cabin',
    cell: booking => booking.getValue(),
  }),

  columnHelper.accessor('guestId.fullName', {
    header: 'Guest',
    cell: booking => booking.getValue(),
  }),
  columnHelper.accessor('guestId.email', {
    header: 'Email',
    cell: booking => booking.getValue(),
  }),
  columnHelper.accessor('startDate', {
    header: 'Dates',
    cell: booking => booking.getValue(),
  }),
  columnHelper.accessor('endDate', {
    header: 'End date',
    cell: booking => booking.getValue(),
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: booking => booking.getValue(),
  }),
  columnHelper.accessor('totalPrice', {
    header: 'Total price',
    cell: booking => booking.getValue(),
  }),
  columnHelper.accessor('numNights', {
    header: 'Nights',
    cell: booking => booking.getValue(),
  }),
  columnHelper.accessor('numGuests', {
    header: 'Guests',
    cell: booking => booking.getValue(),
  }),
]
export type BookingColumns = typeof bookingsColumns
