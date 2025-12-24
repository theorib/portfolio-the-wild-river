import { type BookingsStatus } from '@/features/bookings/schema';
import logger from '@/features/logger';
import { updateBookingById } from '@/services/supabase/mutations/bookings';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type UseCheckInStatusProps = {
	bookingId: number;
};

export default function useCheckInCheckOut({ bookingId }: UseCheckInStatusProps) {
	const queryClient = useQueryClient();
	const supabaseClient = useSupabaseBrowser();

	const useCheckInCheckOut = useMutation({
		mutationKey: ['bookings', { bookingId }, 'checkin-checkout'],
		mutationFn: (status: BookingsStatus) =>
			updateBookingById({
				supabaseClient,
				bookingId,
				bookingData: { status },
			}),
		onSuccess: async (_, status) => {
			await queryClient.invalidateQueries({
				queryKey: ['bookings', 'todays-activities'],
			});
			await queryClient.refetchQueries({
				queryKey: ['bookings', 'todays-activities'],
			});
			toast.success(
				`Booking ${bookingId} successfully ${status === 'checked-in' ? 'checked in' : 'checked out'}`,
			);
		},
		onError: (error, status) => {
			const message = `Error ${status === 'checked-in' ? 'checking in' : 'checking out'} booking ${bookingId}`;
			logger.withError(error).error(message);
			toast.error(message);
		},
	});
	return useCheckInCheckOut;
}
