import logger from '@/features/logger'
import { type BookingsStatusFilter } from '@/features/bookings/schema'
import {
  type PaginationLimit as Pagination,
  type Sort,
  type TypedSupabaseClient,
  type BookingsAutoRow,
} from '@/services/supabase/supabase.types'
type GetBookingsProps<TData> = {
  supabaseClient: TypedSupabaseClient
  statusFilter?: BookingsStatusFilter
  sort?: Sort<TData>
  pagination?: Pagination<TData>
}

export const getBookings = async ({
  supabaseClient,
  sort = { columnName: 'id', ascending: true },
  pagination = { columnName: 'id', lastValue: null, numberOfItems: 5 },
}: GetBookingsProps<BookingsAutoRow>) => {
  let query = supabaseClient
    .from('bookings')
    .select(`*, guestId(fullName, id, email)`)
    .order(sort.columnName, { ascending: sort.ascending })
    .limit(pagination.numberOfItems)

  // Add pagination to the query if pagination is provided
  if (pagination.lastValue) {
    query = query.gt(pagination.columnName, pagination.lastValue)
  }

  const { data, error } = await query

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
