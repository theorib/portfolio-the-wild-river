import { Route, type RouteType } from '@/app/app/cabins/routeType';
import { DEFAULT_CABINS_ITEMS_PER_PAGE } from '@/shared/constants';

import { type InferRoute } from 'next-typesafe-url';

import { useSearchParams } from 'next-typesafe-url/app';

export type CabinsSearchParams = Required<InferRoute<RouteType>['output']['searchParams']>;
export type UseCabinsTableSearchParamsResults =
	| {
			data: undefined;
			isLoading: true;
	  }
	| {
			data: CabinsSearchParams;
			isLoading: false;
	  };

export const cabinsTableDefaultPagination = {
	columnName: 'id',
	range: {
		startIndex: 0,
		endIndex: DEFAULT_CABINS_ITEMS_PER_PAGE - 1,
	},
	numberOfItems: DEFAULT_CABINS_ITEMS_PER_PAGE,
} as const;

export const cabinsTableDefaultSort = {
	columnName: 'id',
	ascending: true,
} as const;

export default function useCabinsTableSearchParams(
	defaultSearchParams: CabinsSearchParams = {
		pagination: cabinsTableDefaultPagination,
		sort: cabinsTableDefaultSort,
	},
): UseCabinsTableSearchParamsResults {
	const { data, isLoading, isError } = useSearchParams(Route.searchParams);
	if (isLoading) {
		return {
			data: undefined,
			isLoading: true,
		};
	}

	if (isError || !data) {
		return {
			data: defaultSearchParams,
			isLoading: false,
		};
	}

	return {
		data: data,
		isLoading: false,
	};
}
