'use client';

import { BookingsStatusSchema } from '@/features/bookings/schema';
import CheckInCheckOutButton from '@/features/checkInOut/components/CheckInCheckOutButton';
import {
	TodaySummary,
	TodaySummaryContent,
	TodaySummaryItem,
	TodaySummaryItemBadge,
	TodaySummaryItemFlag,
	TodaySummaryItemList,
	TodaySummaryItemName,
	TodaySummaryItemNumber,
	TodaySummaryTitle,
} from '@/features/dashboard/components/TodaySummary';
import useTodaysActivities from '@/features/dashboard/hooks/useTodaysActivities';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function DashboardSummary({ className, ...props }: React.ComponentProps<'div'>) {
	const { data, status } = useTodaysActivities();

	if (status === 'success' && data) {
		return (
			<TodaySummary className={cn('', className)} {...props}>
				<TodaySummaryContent>
					<TodaySummaryTitle>Today Summary</TodaySummaryTitle>
					<TodaySummaryItemList>
						<TodaySummaryItem className="text-sm">
							<span>Status</span>
							<span>Country</span>
							<span>Name</span>
							<span>Guests</span>
							<span></span>
						</TodaySummaryItem>
						{data.map((item) => {
							const bookingStatus = BookingsStatusSchema.parse(item?.status);

							const status = bookingStatus === 'checked-in' ? 'Departing' : 'Arriving';

							return (
								<TodaySummaryItem key={item.id}>
									<TodaySummaryItemBadge bookingStatus={bookingStatus}>
										{status}
									</TodaySummaryItemBadge>
									<TodaySummaryItemFlag>
										<Image
											width={35}
											height={35}
											src={item.guestId?.countryFlag || '#'}
											alt={`${item.guestId?.nationality} flag`}
										/>
									</TodaySummaryItemFlag>
									<TodaySummaryItemName>{item.guestId?.fullName}</TodaySummaryItemName>
									<TodaySummaryItemNumber>{item.numGuests}</TodaySummaryItemNumber>

									<CheckInCheckOutButton bookingId={item.id} bookingStatus={bookingStatus} />
								</TodaySummaryItem>
							);
						})}
					</TodaySummaryItemList>
				</TodaySummaryContent>
			</TodaySummary>
		);
	}
}
