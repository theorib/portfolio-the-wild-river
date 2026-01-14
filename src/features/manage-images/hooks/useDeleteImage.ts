import logger from '@/features/logger';
import type { DeleteImageParams, StorageBucket } from '@/features/manage-images/types';
import { deleteImageFromStorage } from '@/services/supabase/storage/images';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export type UseDeleteImageParams = Omit<DeleteImageParams, 'bucket'> & {
	bucket?: StorageBucket;
};

export default function useDeleteImage() {
	const supabaseClient = useSupabaseBrowser();

	return useMutation({
		mutationKey: ['delete-image'],
		mutationFn: async ({ path, bucket = 'cabin-images' }: UseDeleteImageParams) => {
			return deleteImageFromStorage({
				supabaseClient,
				bucket,
				path,
			});
		},
		onSuccess: () => {
			toast.success('Image deleted successfully');
			logger.info('Image deleted successfully');
		},
		onError: (error) => {
			const message = 'Error deleting image';
			logger.withError(error).error(message);
			toast.error(message);
		},
	});
}
