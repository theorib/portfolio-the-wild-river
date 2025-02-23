'use server'

import { createClient } from '@/services/supabase/supabaseServer'
import logger from '@/features/logger'
import {
  type BookingsPage,
  type BookingsSort,
  type BookingsStatusFilter,
} from '@/features/bookings/schema'

type GetBookingsProps = {
  statusFilter?: BookingsStatusFilter
  sort?: BookingsSort
  page?: BookingsPage
}

export const getBookings = async () => {
  const supabase = await createClient()

  const { data, error } = await supabase.from('bookings').select('*')

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
