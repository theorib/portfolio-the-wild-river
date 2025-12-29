import { PageHeader, PageHeaderTitle } from '@/components/ui-custom/PageHeader';
import BookingDetails from '@/features/bookings/bookingDetails/BookingDetails';
import BookingPageTitleBadge from '@/features/bookings/components/BookingPageTitleBadge';
import { bookingQuery } from '@/features/bookings/hooks/useBooking';
import { createClient } from '@/services/supabase/supabaseServer';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import type { InferPagePropsType } from 'next-typesafe-url';
import { withParamValidation } from 'next-typesafe-url/app/hoc';
import { Route, type RouteType } from './routeType';

type PageProps = InferPagePropsType<RouteType>;

export async function BookingPage({ routeParams }: PageProps) {
	const { bookingId } = await routeParams;

	const queryClient = new QueryClient();
	const supabaseClient = await createClient();

	await queryClient.prefetchQuery(
		bookingQuery({
			supabaseClient,
			bookingId,
		}),
	);

	return (
		<div>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<PageHeader>
					<PageHeaderTitle className="flex items-center gap-6">
						Booking #{bookingId}
						<BookingPageTitleBadge />
					</PageHeaderTitle>
				</PageHeader>
				<BookingDetails />
			</HydrationBoundary>
		</div>
	);
}
export default withParamValidation(BookingPage, Route);
