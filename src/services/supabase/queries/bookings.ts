import logger from '@/features/logger'
import type { TypedSupabaseClient } from '@/services/supabase/supabase.types'

type GetBookingsProps = {
  supabaseClient: TypedSupabaseClient
}

export const getBookings = async ({ supabaseClient }: GetBookingsProps) => {
  const query = supabaseClient
    .from('bookings')
    .select(`*, guestId(fullName, id, email)`, { count: 'exact' })

  const { data, error, count } = await query

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

  return { data, count }
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
    .select(`*, guestId(*), cabinId(name)`)
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
