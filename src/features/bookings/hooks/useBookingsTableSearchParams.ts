import { Route, type RouteType } from '@/app/app/bookings/routeType'
import {
  bookingsTableDefaultPagination,
  bookingsTableDefaultSort,
} from '@/features/bookings/hooks/useBookings'

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
