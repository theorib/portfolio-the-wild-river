import logger from '@/features/logger'
import {
  type BookingsPage,
  type BookingsSort,
  type BookingsStatusFilter,
} from '@/features/bookings/schema'
import { type TypedSupabaseClient } from '@/services/supabase/supabase.types'

type GetBookingsProps = {
  supabaseClient: TypedSupabaseClient
  statusFilter?: BookingsStatusFilter
  sort?: BookingsSort
  page?: BookingsPage
}

export const getBookings = async ({ supabaseClient }: GetBookingsProps) => {
  const { data, error } = await supabaseClient
    .from('bookings')
    .select(`*, guestId(fullName, id, email)`)

  if (error || !data) {
    logger
      .withMetadata({
        function: 'getBookings',
        supabaseData: data,
      })
      .withError(error)
      .error('Error getting bookings')

    throw error
  }

  return data
}

export const getBookingById = async ({
  supabaseClient,
  bookingId,
}: {
  supabaseClient: TypedSupabaseClient
  bookingId: number
}) => {
  const { data, error } = await supabaseClient
    .from('bookings')
    .select(`*, guestId(fullName, id, email), cabinId(name)`)
    .eq('id', bookingId)
    .single()

  if (error || !data) {
    logger
      .withMetadata({
        function: 'getBookingById',
        supabaseData: data,
      })
      .withError(error)
      .error('Error getting booking')
    throw error
  }

  return data
}
