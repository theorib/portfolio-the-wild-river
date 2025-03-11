import logger from '@/features/logger'
import { deleteBookingById } from '@/services/supabase/mutations/bookings'
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type UseCheckInStatusProps = {
  bookingId: number
}

export default function useDeleteBookingById({
  bookingId,
}: UseCheckInStatusProps) {
  const queryClient = useQueryClient()
  const supabaseClient = useSupabaseBrowser()

  const useCheckIn = useMutation({
    mutationFn: () =>
      deleteBookingById({
        supabaseClient,
        bookingId,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['bookings'] })
      toast.success(`Booking ${bookingId} successfully deleted`)
    },
    onError: error => {
      const message = `Error deleting booking ${bookingId}`
      logger.withError(error).error(message)
      toast.error(message)
    },
  })
  return useCheckIn
}
