import logger from '@/features/logger';
import { deleteCabinById } from '@/services/supabase/mutations/cabins';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

type UseCheckDeleteCabinByIdProps = {
	cabinId: number;
};

export default function useDeleteCabinById({ cabinId }: UseCheckDeleteCabinByIdProps) {
	const queryClient = useQueryClient();
	const supabaseClient = useSupabaseBrowser();

	const useDeleteCabinById = useMutation({
		mutationKey: ['cabins', { cabinId }, 'delete'],
		mutationFn: () =>
			deleteCabinById({
				supabaseClient,
				cabinId,
			}),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['cabins', ['bookings']] });
			await queryClient.refetchQueries({
				queryKey: ['cabins', 'bookings', 'todays-activities'],
			});
			toast.success(`Cabin ${cabinId} successfully deleted`);
		},
		onError: (error) => {
			const message = `Error deleting cabin ${cabinId}`;
			logger.withError(error).error(message);
			toast.error(message);
		},
	});
	return useDeleteCabinById;
}
