import { publicCabinsRowSchemaSchema } from '@/services/supabase/supabaseSchemas';
import { type DynamicRoute } from 'next-typesafe-url';
import { z } from 'zod';

export const Route = {
	searchParams: z.object({
		sort: z.object({
			columnName: publicCabinsRowSchemaSchema.keyof(),
			ascending: z.boolean(),
		}),

		pagination: z.object({
			columnName: publicCabinsRowSchemaSchema.keyof(),
			range: z.object({
				startIndex: z.number(),
				endIndex: z.number(),
			}),
			numberOfItems: z.number(),
		}),
	}),
} satisfies DynamicRoute;
export type RouteType = typeof Route;
