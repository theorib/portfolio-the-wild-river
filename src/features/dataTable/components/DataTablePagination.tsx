import { type Table } from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
	const getCanPreviousPage = table.getCanPreviousPage();
	const getCanNextPage = table.getCanNextPage();

	return (
		<div className="flex w-full items-center justify-between space-x-6 lg:space-x-8">
			<div className="flex items-center space-x-2">
				<p className="text-sm font-medium">Rows per page</p>
				<Select
					value={`${table.getState().pagination.pageSize}`}
					onValueChange={(value) => {
						table.setPageSize(Number(value));
					}}
				>
					<SelectTrigger className="h-8 w-17.5">
						<SelectValue />
					</SelectTrigger>
					<SelectContent side="top">
						{[3, 6, 9, 12, 15, 18, 21].map((pageSize) => (
							<SelectItem key={pageSize} value={`${pageSize}`}>
								{pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex w-25 items-center justify-center text-sm font-medium">
				Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
			</div>
			<div className="flex items-center space-x-2">
				<Button
					data-active={getCanPreviousPage}
					aria-disabled={!getCanPreviousPage}
					tabIndex={getCanPreviousPage ? undefined : -1}
					variant="outline"
					className={`hidden h-8 w-8 p-0 lg:flex`}
					onClick={() => table.setPageIndex(0)}
					disabled={!getCanPreviousPage}
				>
					<span className="sr-only">Go to first page</span>
					<ChevronsLeft />
				</Button>
				<Button
					data-active={getCanPreviousPage}
					aria-disabled={!getCanPreviousPage}
					tabIndex={getCanPreviousPage ? undefined : -1}
					variant="outline"
					className="h-8 w-8 p-0"
					onClick={() => table.previousPage()}
					disabled={!getCanPreviousPage}
				>
					<span className="sr-only">Go to previous page</span>
					<ChevronLeft />
				</Button>
				<Button
					data-active={getCanNextPage}
					aria-disabled={!getCanNextPage}
					tabIndex={getCanNextPage ? undefined : -1}
					variant="outline"
					className="h-8 w-8 p-0"
					onClick={() => table.nextPage()}
					disabled={!getCanNextPage}
				>
					<span className="sr-only">Go to next page</span>
					<ChevronRight />
				</Button>
				<Button
					data-active={getCanNextPage}
					aria-disabled={!getCanNextPage}
					tabIndex={getCanNextPage ? undefined : -1}
					variant="outline"
					className="hidden h-8 w-8 p-0 lg:flex"
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!getCanNextPage}
				>
					<span className="sr-only">Go to last page</span>
					<ChevronsRight />
				</Button>
			</div>
		</div>
	);
}
