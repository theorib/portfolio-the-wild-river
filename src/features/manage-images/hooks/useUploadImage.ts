import logger from '@/features/logger';
import type { StorageBucket, UploadImageParams } from '@/features/manage-images/types';
import { uploadImageToStorage } from '@/services/supabase/storage/images';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export type UseUploadImageParams = Omit<UploadImageParams, 'bucket'> & {
	bucket?: StorageBucket;
};

export default function useUploadImage() {
	const supabaseClient = useSupabaseBrowser();

	return useMutation({
		mutationKey: ['upload-image'],
		mutationFn: async ({ file, bucket = 'cabin-images', path }: UseUploadImageParams) => {
			// Validate file size
			if (file.size > MAX_FILE_SIZE) {
				throw new Error(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
			}

			// Validate file type
			if (!ALLOWED_FILE_TYPES.includes(file.type)) {
				throw new Error('File must be an image (JPEG, PNG, or WebP)');
			}

			return uploadImageToStorage({
				supabaseClient,
				file,
				bucket,
				path,
			});
		},
		onSuccess: (data) => {
			toast.success('Image uploaded successfully');
			logger
				.withMetadata({
					function: 'useUploadImage',
					path: data.path,
				})
				.info('Image uploaded successfully');
		},
		onError: (error) => {
			const message = error instanceof Error ? error.message : 'Error uploading image';
			logger.withError(error).error(message);
			toast.error(message);
		},
	});
}
