import BookingPageTitleBadge from '@/features/bookings/components/BookingPageTitleBadge';
import { cabinQuery } from '@/features/cabins/hooks/useCabin';
import { createClient } from '@/services/supabase/supabaseServer';
import { PageHeader, PageHeaderTitle } from '@/shared/components/ui-custom/PageHeader';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import type { InferPagePropsType } from 'next-typesafe-url';
import { withParamValidation } from 'next-typesafe-url/app/hoc';
import { Route, type RouteType } from './routeType';

type PageProps = InferPagePropsType<RouteType>;

export async function BookingPage({ routeParams }: PageProps) {
	const { cabinId } = await routeParams;

	const queryClient = new QueryClient();
	const supabaseClient = await createClient();

	await queryClient.prefetchQuery(
		cabinQuery({
			supabaseClient,
			cabinId,
		}),
	);

	return (
		<div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<PageHeader>
					<PageHeaderTitle className="flex items-center gap-6">
						Cabin #{cabinId}
						<BookingPageTitleBadge />
					</PageHeaderTitle>
				</PageHeader>
				{/* <BookingDetails /> */}
			</HydrationBoundary>
		</div>
	);
}
export default withParamValidation(BookingPage, Route);
