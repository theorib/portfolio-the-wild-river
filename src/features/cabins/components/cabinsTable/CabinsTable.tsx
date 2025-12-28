'use client';

import DataTable from '@/features/dataTable/components/DataTable';

import { cabinsTableColumns } from '@/features/cabins/components/cabinsTable/CabinsTableColumns';
import useCabins from '@/features/cabins/hooks/useCabins';
import useCabinsTableSearchParams from '@/features/cabins/hooks/useCabinsTableSearchParams';

export default function CabinsTable() {
	const { data: searchParams, isLoading: isLoadingSearchParams } = useCabinsTableSearchParams();

	const { data, isLoading, isPending, isFetching, status } = useCabins({
		enabled: !isLoadingSearchParams,
	});

	if (isLoading || isLoadingSearchParams) {
		return <div>Loading...</div>;
	}
	if (!searchParams && !isFetching && !isPending && !isLoading) return <div>error...</div>;

	if (searchParams && status === 'success' && data?.data) {
		return (
			<div className="grid grid-cols-1 gap-4">
				<DataTable
					data={data.data || []}
					rowCount={data.count || 0}
					columns={cabinsTableColumns}
					defaultColumnVisibility={{ cabinId: false, description: false }}
					defaultSorting={[
						{
							id: 'name',
							desc: false,
						},
					]}
				/>
			</div>
		);
	}
	return null;
}
