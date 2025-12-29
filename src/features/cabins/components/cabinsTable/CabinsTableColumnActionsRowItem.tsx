'use client';
import { cabinQuery } from '@/features/cabins/hooks/useCabin';
import useDeleteCabinById from '@/features/cabins/hooks/useDeleteCabinById';
import { type Cabin } from '@/features/cabins/types';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { Button } from '@/shared/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useQueryClient } from '@tanstack/react-query';

import { EllipsisVertical, Eye, OctagonX } from 'lucide-react';
import { $path } from 'next-typesafe-url';
import Link from 'next/link';

type CabinListItemDropdownProps = {
	cabin: Cabin;
};

// type BookingStatusHandlerItem = {
// 	icon?: React.ReactNode | undefined;
// 	label?: string | undefined;
// 	onClickHandler?: (() => void) | undefined;
// 	onHoverHandler?: (() => void) | undefined;
// };

// type BookingStatusHandler = Record<BookingsStatus, BookingStatusHandlerItem>;

export default function CabinsTableColumnActionsRowItem({ cabin }: CabinListItemDropdownProps) {
	const cabinId = cabin.id;
	const queryClient = useQueryClient();
	const supabaseClient = useSupabaseBrowser();

	// const { mutate: mutateCheckIn } = useCheckInCheckOut({
	// 	bookingId,
	// });
	const { mutate: deleteCabin } = useDeleteCabinById({
		cabinId,
	});

	const prefetchCabinQuery = () => {
		void (async (): Promise<void> => {
			await queryClient.prefetchQuery({
				...cabinQuery({
					supabaseClient,
					cabinId,
				}),
				// so we don't prefetch the same query every time the use hovers the item
				staleTime: 25 * 1000,
			});
		})();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				nativeButton
				render={
					<Button variant="ghost">
						<EllipsisVertical />
					</Button>
				}
			/>

			<DropdownMenuContent className="w-56">
				<DropdownMenuGroup>
					<DropdownMenuLabel>{`Cabin #${cabinId}`}</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem
						onMouseEnter={prefetchCabinQuery}
						render={
							<Link
								href={$path({
									route: '/app/cabins/[cabinId]',
									routeParams: { cabinId },
								})}
								className="flex cursor-pointer items-center gap-2"
							>
								<Eye />
								See Details
							</Link>
						}
					/>

					<DropdownMenuItem
						nativeButton
						render={
							<button className="w-full" onClick={() => deleteCabin()}>
								<OctagonX /> Delete
							</button>
						}
						className="cursor-pointer"
					/>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
