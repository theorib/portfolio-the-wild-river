import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { CircleX } from 'lucide-react';

export function BookingsTableItemCellContainer({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="booking-data-cell-container"
			className={cn('flex flex-col gap-1', className)}
			{...props}
		/>
	);
}

export function BookingTableItemCellBold({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span data-slot="booking-data-cell-bold" className={cn('font-medium', className)} {...props} />
	);
}

export function BookingTableItemCellLight({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span data-slot="booking-data-cell-light" className={cn('opacity-55', className)} {...props} />
	);
}

type BookingTableItemErrorDialogProps = {
	error: unknown;
	children?: React.ReactNode;
};

export function BookingTableItemCellError({ children, error }: BookingTableItemErrorDialogProps) {
	if (!error) return null;

	const parsedError = error instanceof Error ? error : new Error('unknown error', { cause: error });

	return (
		<Dialog>
			<DialogTrigger
				render={
					<Button variant="destructive" size="xs">
						<CircleX />
						{children ? children : 'Error'}
					</Button>
				}
			/>
			<DialogContent className="flex flex-col sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Error</DialogTitle>
					<DialogDescription
						render={
							<div className="bg-destructive flex items-center gap-4 rounded p-4 break-words">
								<CircleX className="text-destructive-foreground" />
								<p className="text-destructive-foreground">{parsedError.message}</p>
							</div>
						}
					/>
				</DialogHeader>

				<ScrollArea>
					<pre className="bg-destructive/15 overflow-scroll rounded p-4">
						<code>{JSON.stringify(parsedError, null, 2)}</code>
					</pre>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
