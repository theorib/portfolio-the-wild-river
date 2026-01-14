'use client';

import CabinDetailsError from '@/features/cabins/components/cabinDetails/CabinDetailsError';
import { CabinDetailsSkeleton } from '@/features/cabins/components/cabinDetails/CabinDetailsSkeleton';
import useCabin from '@/features/cabins/hooks/useCabin';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EditCabinDialog from '@/features/cabins/components/editCabin/EditCabinDialog';
import { cn } from '@/lib/utils';
import { Pencil, University } from 'lucide-react';

import { useParams } from 'next/navigation';
import { useState } from 'react';

export const CabinDetailsList = ({ className, ...props }: React.ComponentProps<'ul'>) => {
	return (
		<ul
			data-slot="cabin-details-list"
			className={cn('flex items-center gap-1', className)}
			{...props}
		/>
	);
};
export const CabinDetailsListItem = ({ className, ...props }: React.ComponentProps<'li'>) => {
	return (
		<li
			data-slot="cabin-details-list-item"
			className={cn(
				'flex items-center gap-1 after:mx-2 after:opacity-50 after:content-["•"] last:after:content-none',
				className,
			)}
			{...props}
		/>
	);
};

export default function CabinDetails() {
	const { cabinId } = useParams<{ cabinId: string }>();
	const [editDialogOpen, setEditDialogOpen] = useState(false);

	const {
		data: cabin,
		isLoading,
		status,
	} = useCabin({
		cabinId: parseInt(cabinId),
	});

	if (isLoading) return <CabinDetailsSkeleton />;

	if (status === 'error') return <CabinDetailsError />;

	if (status === 'success' && cabin) {
		return (
			<>
				<Card>
					<CardHeader className="bg-sidebar border-b">
						<CardTitle className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<University strokeWidth={2} />
								<span>{cabin.name}</span>
							</div>
							<Button variant="outline" size="sm" onClick={() => setEditDialogOpen(true)}>
								<Pencil className="mr-2 h-4 w-4" />
								Edit Cabin
							</Button>
						</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-6 py-10">
						<CabinDetailsList>
							<CabinDetailsListItem>
								{/* <BookingFlag
								url={cabin?.guestId?.countryFlag}
								nationality={cabin?.guestId?.nationality}
								flagSize={25}
							/> */}
							</CabinDetailsListItem>
							<CabinDetailsListItem>
								{/* {cabin?.guestId?.fullName} {cabin?.numGuests ? `+ ${cabin?.numGuests} guests` : null} */}
							</CabinDetailsListItem>

							<CabinDetailsListItem>
								{/* <Link
								href={`mailto:${cabin?.guestId?.email}`}
								className="underline underline-offset-3 after:no-underline"
							>
								{cabin?.guestId?.email}
							</Link> */}
							</CabinDetailsListItem>
							<CabinDetailsListItem>
								{/* {cabin?.guestId?.nationalID ? `National ID: ${cabin?.guestId.nationalID}` : null} */}
							</CabinDetailsListItem>
						</CabinDetailsList>

						{/* <div className="flex items-center gap-2">
						{cabin?.hasBreakfast ? (
							<CircleCheck strokeWidth={SIDEBAR_ICON_STROKE_WIDTH} />
						) : (
							<CircleX strokeWidth={SIDEBAR_ICON_STROKE_WIDTH} />
						)}
						<span className="font-bold">{`Breakfast included? `}</span>
						<span>{`${cabin?.hasBreakfast ? 'Yes' : 'No'}`}</span>
					</div> */}
						{/* <div
						className={`flex items-center gap-2 rounded-xl p-6 ${cabin?.isPaid ? 'bg-green-100 dark:bg-green-950' : 'bg-red-100 dark:bg-red-950'}`}
					>
						<CircleDollarSign strokeWidth={1} />
						<div className="flex grow items-center gap-2">
							<span>{`Total price: `}</span>
							<span className="font-bold">{`${formatCurrency(cabin.totalPrice || 0)} `}</span>
							<span className="text-sm">
								{`(${formatCurrency(cabin.cabinPrice || 0)}`}
								{` cabin + `}
								{`${formatCurrency(cabin.extrasPrice || 0)} extras)`}
							</span>
						</div>
						<span className="font-bold tracking-tighter uppercase">
							{cabin.isPaid ? 'Paid' : 'Not paid'}
						</span>
					</div> */}
					</CardContent>
					<CardFooter className="bg-sidebar justify-end border-t pt-6 text-sm">
						{/* Booked on {format(new Date(cabin.created_at), 'PPPPpppp')} */}
					</CardFooter>
				</Card>

				<EditCabinDialog
					cabin={cabin}
					open={editDialogOpen}
					onOpenChange={setEditDialogOpen}
				/>
			</>
		);
	}
}
