'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Cabin } from '@/features/cabins/types';
import EditCabinForm from './EditCabinForm';

type EditCabinDialogProps = {
	cabin: Cabin;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export default function EditCabinDialog({ cabin, open, onOpenChange }: EditCabinDialogProps) {
	const handleSuccess = () => {
		onOpenChange(false);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[750px] p-0">
				<ScrollArea className="max-h-[calc(90vh-2.5rem)]">
					<div className=" p-4 sm:p-15">
						<DialogHeader>
							<DialogTitle>Edit Cabin #{cabin.id}</DialogTitle>
							<DialogDescription>
								Update the cabin details below. All fields except discount are required.
							</DialogDescription>
						</DialogHeader>
						<EditCabinForm cabin={cabin} onSuccess={handleSuccess} className="pt-8" />
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
