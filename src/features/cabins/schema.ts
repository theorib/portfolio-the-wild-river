import { z } from 'zod';

export const EditCabinFormSchema = z
	.object({
		name: z.string().min(3, 'Cabin name must be at least 3 characters'),
		description: z.string().min(10, 'Description must be at least 10 characters'),
		maxCapacity: z.number().min(1, 'Max capacity must be at least 1'),
		regularPrice: z.number().min(0, 'Regular price must be at least 0'),
		discount: z.number().min(0, 'Discount must be at least 0').optional(),
		image: z.union([z.instanceof(File), z.string()]).optional(),
	})
	.refine(
		(data) => {
			// If discount exists, it must be less than or equal to regularPrice
			if (data.discount !== undefined && data.discount > data.regularPrice) {
				return false;
			}
			return true;
		},
		{
			message: 'Discount cannot be greater than regular price',
			path: ['discount'],
		},
	);

export type EditCabinFormData = z.infer<typeof EditCabinFormSchema>;
