'use client'
import { type Booking, type Bookings } from '@/services/supabase/supabase.types'
import { type ColumnDef } from '@tanstack/react-table'

// CABIN
// GUEST
// DATES
// STATUS
// AMOUNT

export const bookingsColumns: Array<ColumnDef<Booking>> = [
  {
    header: 'Cabin',
    accessorKey: 'cabinId',
  },
  {
    header: 'Guest',
    accessorKey: 'guestId.fullName',
  },
  {
    header: 'Email',
    accessorKey: 'guestId.email',
  },
  {
    header: 'Dates',
    accessorKey: 'startDate',
  },
  {
    header: 'End date',
    accessorKey: 'endDate',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Total price',
    accessorKey: 'totalPrice',
  },
  {
    header: 'Nights',
    accessorKey: 'numNights',
  },
  {
    header: 'Guests',
    accessorKey: 'numGuests',
  },
]
