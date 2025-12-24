import { type Dispatch, type SetStateAction, useState } from 'react';

export type Pagination = {
	pageIndex: number;
	pageSize: number;
};

export default function usePagination({
	pageSize,
}: Omit<Pagination, 'pageIndex'>): [Pagination, Dispatch<SetStateAction<Pagination>>] {
	const [pagination, setPagination] = useState<Pagination>({
		pageIndex: 0, //initial page index
		pageSize, //default page size
	});
	return [pagination, setPagination];
}
