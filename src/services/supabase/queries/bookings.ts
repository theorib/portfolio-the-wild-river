import logger from '@/features/logger'
import { type BookingsStatusFilter } from '@/features/bookings/schema'
import type {
  TypedSupabaseClient,
  BookingsAutoRow,
} from '@/services/supabase/supabase.types'
import { DEFAULT_BOOKING_ITEMS_PER_PAGE } from '@/shared/constants'
import type { Pagination, Sort } from '@/shared/types'
type GetBookingsProps<TData> = {
  supabaseClient: TypedSupabaseClient
  statusFilter?: BookingsStatusFilter
  sort?: Sort<TData>
  pagination?: Pagination<TData>
}

export const getBookings = async ({
  supabaseClient,
  sort = { columnName: 'id', ascending: true },
  pagination = {
    columnName: 'id',
    range: {
      startIndex: 0,
      endIndex: DEFAULT_BOOKING_ITEMS_PER_PAGE - 1,
    },
    numberOfItems: DEFAULT_BOOKING_ITEMS_PER_PAGE,
  },
}: GetBookingsProps<BookingsAutoRow>) => {
  let query = supabaseClient
    .from('bookings')
    .select(`*, guestId(fullName, id, email)`, { count: 'exact' })
    .order(sort.columnName, { ascending: sort.ascending })
    .limit(pagination.numberOfItems)

  // Add pagination to the query if pagination is provided
  if (pagination.range.startIndex > 0) {
    query = query.range(pagination.range.startIndex, pagination.range.endIndex)
  }

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
