import { Route, type RouteType } from '@/app/app/bookings/routeType'
import { DEFAULT_BOOKING_ITEMS_PER_PAGE } from '@/shared/constants'

import { type InferRoute } from 'next-typesafe-url'

import { useSearchParams } from 'next-typesafe-url/app'

export type BookingsSearchParams = Required<
  InferRoute<RouteType>['output']['searchParams']
>
export type UseBookingsTableSearchParamsResults =
  | {
      data: undefined
      isLoading: true
    }
  | {
      data: BookingsSearchParams
      isLoading: false
    }

export const bookingsTableDefaultPagination = {
  columnName: 'id',
  range: {
    startIndex: 0,
    endIndex: DEFAULT_BOOKING_ITEMS_PER_PAGE - 1,
  },
  numberOfItems: DEFAULT_BOOKING_ITEMS_PER_PAGE,
} as const

export const bookingsTableDefaultSort = {
  columnName: 'id',
  ascending: true,
} as const

export default function useBookingsTableSearchParams(
  defaultSearchParams: BookingsSearchParams = {
    pagination: bookingsTableDefaultPagination,
    sort: bookingsTableDefaultSort,
  },
): UseBookingsTableSearchParamsResults {
  const { data, isLoading, isError } = useSearchParams(Route.searchParams)
  if (isLoading) {
    return {
      data: undefined,
      isLoading: true,
    }
  }

  if (isError || !data) {
    return {
      data: defaultSearchParams,
      isLoading: false,
    }
  }

  return {
    data: data,
    isLoading: false,
  }
}
