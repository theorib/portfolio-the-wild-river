'use client';
import { Button } from '@/components/ui/button';
import type { BookingsStatus } from '@/features/bookings/schema';
import useCheckInCheckOut from '@/features/checkInOut/hooks/useCheckInCheckout';
import { useRef } from 'react';

type CheckInCheckOutBtnProps = {
	bookingId: number;
	bookingStatus: BookingsStatus;
} & React.ComponentProps<typeof Button>;

type UnconfirmedStatus = {
	newStatus: 'checked-in';
	buttonText: 'Check In';
	buttonLoadingText: 'Checking in';
};
type CheckedInStatus = {
	newStatus: 'checked-out';
	buttonText: 'Check Out';
	buttonLoadingText: 'Checking out';
};

type UpdatedStatus = {
	unconfirmed: UnconfirmedStatus;
	'checked-in': CheckedInStatus;
	'checked-out': null;
};

export function CheckInCheckOutButton({
	bookingId,
	bookingStatus,
	...props
}: CheckInCheckOutBtnProps) {
	const { mutate, status } = useCheckInCheckOut({ bookingId });
	const bookingStatusRef = useRef(bookingStatus);

	const updatedStatus: UpdatedStatus = {
		'checked-in': {
			newStatus: 'checked-out',
			buttonText: 'Check Out',
			buttonLoadingText: 'Checking out',
		},
		unconfirmed: {
			newStatus: 'checked-in',
			buttonText: 'Check In',
			buttonLoadingText: 'Checking in',
		},
		'checked-out': null,
	} as const;

	if (bookingStatus === 'checked-out') return null;
	return (
		<Button
			onClick={() => {
				mutate(updatedStatus[bookingStatus]?.newStatus);
			}}
			{...props}
			size={'xs'}
			disabled={status === 'pending'}
		>
			{status === 'pending'
				? updatedStatus[bookingStatus]?.buttonLoadingText
				: updatedStatus[bookingStatus]?.buttonText}
		</Button>
	);
}
export default CheckInCheckOutButton;
