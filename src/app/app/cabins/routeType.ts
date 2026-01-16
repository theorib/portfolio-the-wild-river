import { publicCabinsRowSchema } from '@/services/supabase/supabase.auto.schemas';
import { type DynamicRoute } from 'next-typesafe-url';
import { z } from 'zod';

export const Route = {
	searchParams: z.object({
		sort: z
			.object({
				columnName: publicCabinsRowSchema.keyof(),
				ascending: z.boolean(),
			})
			.optional(),

		pagination: z
			.object({
				columnName: publicCabinsRowSchema.keyof(),
				range: z.object({
					startIndex: z.number(),
					endIndex: z.number(),
				}),
				numberOfItems: z.number(),
			})
			.optional(),
	}),
} satisfies DynamicRoute;
export type RouteType = typeof Route;
