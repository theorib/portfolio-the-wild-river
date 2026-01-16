import { publicBookingsRowSchema } from '@/services/supabase/supabase.auto.schemas';
import { type DynamicRoute } from 'next-typesafe-url';
import { z } from 'zod';

export const Route = {
	searchParams: z.object({
		sort: z.object({
			columnName: publicBookingsRowSchema.keyof(),
			ascending: z.boolean(),
		}),

		pagination: z.object({
			columnName: publicBookingsRowSchema.keyof(),
			range: z.object({
				startIndex: z.number(),
				endIndex: z.number(),
			}),
			numberOfItems: z.number(),
		}),
	}),
} satisfies DynamicRoute;
export type RouteType = typeof Route;
