'use client';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import EditCabinDialog from '@/features/cabins/components/editCabin/EditCabinDialog';
import { cabinQuery } from '@/features/cabins/hooks/useCabin';
import useDeleteCabinById from '@/features/cabins/hooks/useDeleteCabinById';
import { type Cabin } from '@/features/cabins/types';
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser';
import { useQueryClient } from '@tanstack/react-query';

import { EllipsisVertical, Eye, OctagonX, Pencil } from 'lucide-react';
import { $path } from 'next-typesafe-url';
import Link from 'next/link';
import { useState } from 'react';

type CabinListItemDropdownProps = {
	cabin: Cabin;
};

export default function CabinsTableColumnActionsRowItem({ cabin }: CabinListItemDropdownProps) {
	const cabinId = cabin.id;
	const queryClient = useQueryClient();
	const supabaseClient = useSupabaseBrowser();
	const [editDialogOpen, setEditDialogOpen] = useState(false);

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
		<>
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
							onClick={() => setEditDialogOpen(true)}
							className="cursor-pointer"
						>
							<Pencil />
							Edit Cabin
						</DropdownMenuItem>

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

			{/* Dialog placed outside menu structure per Base UI docs for proper focus management */}
			<EditCabinDialog cabin={cabin} open={editDialogOpen} onOpenChange={setEditDialogOpen} />
		</>
	);
}
