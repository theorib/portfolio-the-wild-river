'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Cabin } from '@/features/cabins/types';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import EditCabinForm from './EditCabinForm';

type EditCabinDialogProps = {
	cabin: Cabin;
};

export const DefaultEditCabinTrigger = () => {
	return (
		<Button variant="outline" size="sm">
			<Pencil className="mr-2 h-4 w-4" />
			Edit Cabin
		</Button>
	);
};

export const editCabinDialogHandle = DialogPrimitive.createHandle();

export default function EditCabinDialog({ cabin }: EditCabinDialogProps) {
	const [openDialog, setOpenDialog] = useState(false);

	const handleSuccess = () => {
		setOpenDialog(false);
	};

	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog} handle={editCabinDialogHandle}>
			<DialogContent className="sm:max-w-[600px] p-8">
				<ScrollArea className="max-h-[90vh]">
					<div className="mr-6">
						<DialogHeader>
							<DialogTitle>Edit Cabin #{cabin.id}</DialogTitle>
							<DialogDescription>
								Update the cabin details below. All fields except discount are required.
							</DialogDescription>
						</DialogHeader>
						<EditCabinForm cabin={cabin} onSuccess={handleSuccess} />
					</div>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
