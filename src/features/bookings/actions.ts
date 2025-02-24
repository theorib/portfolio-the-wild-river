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
  const { data, error } = await supabaseClient.from('bookings').select('*')

  if (error || !data) {
    logger
      .withMetadata({
        function: 'getBookings',
        supabaseData: data,
      })
      .withError(error)
      .error('Error getting bookings')
  }

  return { data, error }
}
