export type UploadImageParams = {
	file: File;
	bucket: string;
	path?: string;
};

export type DeleteImageParams = {
	bucket: string;
	path: string;
};

export type ImageUploadResult = {
	path: string;
	publicUrl: string;
};

export type StorageBucket = 'cabin-images';
