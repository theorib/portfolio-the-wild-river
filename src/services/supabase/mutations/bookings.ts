import logger from '@/features/logger'
import type {
  BookingUpdate,
  TypedSupabaseClient,
} from '@/services/supabase/supabase.types'

export type UpdateBookingByIdProps = {
  supabaseClient: TypedSupabaseClient
  bookingId: number
  bookingData: BookingUpdate
}

export const updateBookingById = async ({
  supabaseClient,
  bookingId,
  bookingData,
}: UpdateBookingByIdProps) => {
  const { data, error } = await supabaseClient
    .from('bookings')
    .update(bookingData)
    .eq('id', bookingId)
    .select()
    .single()

  if (error || !data) {
    logger
      .withMetadata({
        function: 'updateBookingById',
        supabaseData: data,
      })
      .withError(error || new Error('no data'))
      .error(`Error updating booking ${bookingId}`)
    throw error
  }

  return data
}

export const deleteBookingById = async ({
  supabaseClient,
  bookingId,
}: {
  supabaseClient: TypedSupabaseClient
  bookingId: number
}) => {
  const { data, error } = await supabaseClient
    .from('bookings')
    .delete()
    .eq('id', bookingId)

  if (error) {
    logger
      .withMetadata({
        function: 'deleteBookingById',
        supabaseData: data,
      })
      .withError(error)
      .error(`Error deleting booking ${bookingId}`)
    throw error
  }
  return data
}
