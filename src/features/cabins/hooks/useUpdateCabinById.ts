import logger from '@/features/logger';
import { updateCabinById, type UpdateCabinByIdProps } from '@/services/supabase/mutations/cabins';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export type UpdateCabinIdProps = Omit<UpdateCabinByIdProps, 'supabaseClient'>;

export default function useUpdateCabinById({ cabinId }: Omit<UpdateCabinIdProps, 'cabinData'>) {
	const queryClient = useQueryClient();
	const supabaseClient = useSupabaseBrowser();

	const useUpdateCabinById = useMutation({
		mutationKey: ['cabins', { cabinId }, 'update'],
		mutationFn: ({ cabinId, cabinData }: UpdateCabinIdProps) =>
			updateCabinById({ cabinId, cabinData, supabaseClient }),
		onSuccess: async () => {
			const queryKey = ['cabins'];
			await queryClient.invalidateQueries({ queryKey });
			await queryClient.refetchQueries({ queryKey });

			toast.success(`Cabin with id:${cabinId} successfully updated`);
		},
		onError: (error) => {
			const message = `Error updating cabin with id: ${cabinId}`;
			logger.withError(error).error(message);
			toast.error(message);
		},
	});

	return useUpdateCabinById;
}
