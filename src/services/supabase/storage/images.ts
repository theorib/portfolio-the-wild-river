import logger from '@/features/logger';
import type {
	DeleteImageParams,
	ImageUploadResult,
	UploadImageParams,
} from '@/features/manage-images/types';
import type { TypedSupabaseClient } from '@/services/supabase/supabase.types';

export const uploadImageToStorage = async ({
	supabaseClient,
	file,
	bucket,
	path,
}: UploadImageParams & { supabaseClient: TypedSupabaseClient }): Promise<ImageUploadResult> => {
	// Generate unique filename if path not provided
	const timestamp = Date.now();
	const fileExt = file.name.split('.').pop();
	const fileName = path || `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;

	const { data, error } = await supabaseClient.storage.from(bucket).upload(fileName, file, {
		cacheControl: '3600',
		upsert: false,
	});

	if (error || !data) {
		logger
			.withMetadata({
				function: 'uploadImageToStorage',
				bucket,
				fileName,
				fileSize: file.size,
				fileType: file.type,
			})
			.withError(error)
			.error('Error uploading image to storage');
		throw error;
	}

	// Get public URL
	const {
		data: { publicUrl },
	} = supabaseClient.storage.from(bucket).getPublicUrl(data.path);

	return {
		path: data.path,
		publicUrl,
	};
};

export const deleteImageFromStorage = async ({
	supabaseClient,
	bucket,
	path,
}: DeleteImageParams & { supabaseClient: TypedSupabaseClient }): Promise<void> => {
	const { error } = await supabaseClient.storage.from(bucket).remove([path]);

	if (error) {
		logger
			.withMetadata({
				function: 'deleteImageFromStorage',
				bucket,
				path,
			})
			.withError(error)
			.error('Error deleting image from storage');
		throw error;
	}
};

export const getImagePublicUrl = ({
	supabaseClient,
	bucket,
	path,
}: {
	supabaseClient: TypedSupabaseClient;
	bucket: string;
	path: string;
}): string => {
	const {
		data: { publicUrl },
	} = supabaseClient.storage.from(bucket).getPublicUrl(path);

	return publicUrl;
};

/**
 * Extract storage path from a full Supabase storage URL
 */
export const extractStoragePathFromUrl = (url: string, bucket: string): string | null => {
	try {
		// Match pattern: /storage/v1/object/public/{bucket}/{path}
		const regex = new RegExp(`/storage/v1/object/public/${bucket}/(.+)$`);
		const match = url.match(regex);
		return match ? match[1] : null;
	} catch (error) {
		logger
			.withMetadata({
				function: 'extractStoragePathFromUrl',
				url,
				bucket,
			})
			.withError(error)
			.error('Error extracting storage path from URL');
		return null;
	}
};
