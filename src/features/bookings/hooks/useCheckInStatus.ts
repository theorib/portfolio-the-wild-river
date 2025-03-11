import { type BookingsStatus } from '@/features/bookings/schema'
import logger from '@/features/logger'
import { updateBookingById } from '@/services/supabase/mutations/bookings'
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type UseCheckInStatusProps = {
  bookingId: number
}

export default function useCheckInStatus({ bookingId }: UseCheckInStatusProps) {
  const queryClient = useQueryClient()
  const supabaseClient = useSupabaseBrowser()

  const useCheckIn = useMutation({
    mutationFn: (status: BookingsStatus) =>
      updateBookingById({
        supabaseClient,
        bookingId,
        bookingData: { status },
      }),
    onSuccess: async (_, status) => {
      await queryClient.invalidateQueries({ queryKey: ['bookings'] })
      toast.success(
        `Booking ${bookingId} successfully ${status === 'checked-in' ? 'checked in' : 'checked out'}`,
      )
    },
    onError: (error, status) => {
      const message = `Error ${status === 'checked-in' ? 'checking in' : 'checking out'} booking ${bookingId}`
      logger.withError(error).error(message)
      toast.error(message)
    },
  })
  return useCheckIn
}
