import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/components/ui/pagination'

import { $path } from 'next-typesafe-url'
import useBookings from '@/features/bookings/hooks/useBookings'
import type { BookingsSearchParams } from '@/services/supabase/supabase.types'
import {
  getNextPaginationAndSort,
  getPreviousPaginationAndSort,
} from '@/shared/lib/utils/paginationHelpers'
import useBookingsTableSearchParams from '@/features/bookings/hooks/useBookingsTableSearchParams'

export function BookingsTablePagination() {
  const { data: searchParams, isLoading: isLoadingSearchParams } =
    useBookingsTableSearchParams()

  const pagination = searchParams?.pagination
  const sort = searchParams?.sort

  const { data, status } = useBookings({
    pagination: pagination,
    sort: sort,
    enabled: !isLoadingSearchParams,
  })

  if (status === 'success' && pagination && sort) {
    const count = data?.count
    const numberOfPages = Math.ceil(
      count ? count / pagination.numberOfItems : 0,
    )
    const hasPages = numberOfPages > 1

    if (!count || !hasPages) return null

    const isFirstPage = pagination.range.startIndex <= 0
    const isLastPage = pagination.range.endIndex >= (count ? count - 1 : 0)
    const pagesArray = Array.from({ length: numberOfPages }, (_, i) => i + 1)
    const currentPage = Math.ceil(
      (pagination.range.startIndex + 1) / pagination.numberOfItems,
    )
    const currentPaginationAndSort: BookingsSearchParams = {
      pagination: pagination,
      sort: sort,
    }
    const previousPatinationAndSort = getPreviousPaginationAndSort(
      currentPaginationAndSort,
    )

    const nextPaginationAndSort = getNextPaginationAndSort(
      currentPaginationAndSort,
    )

    const handlePreviousPage = () => {
      return $path({
        route: '/app/bookings',
        searchParams: previousPatinationAndSort,
      })
    }

    const handleNextPage = () => {
      return $path({
        route: '/app/bookings',
        searchParams: nextPaginationAndSort,
      })
    }

    return (
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={handlePreviousPage()}
              isActive={!isFirstPage}
            />
          </PaginationItem>
          {pagesArray.map(page => (
            <PaginationItem key={page}>
              <PaginationLink
                href={$path({
                  route: '/app/bookings',
                  searchParams: {
                    pagination: {
                      columnName: pagination.columnName,
                      range: {
                        startIndex: (page - 1) * pagination.numberOfItems,
                        endIndex:
                          (page - 1) * pagination.numberOfItems +
                          pagination.numberOfItems -
                          1,
                      },
                      numberOfItems: pagination.numberOfItems,
                    },
                    sort: sort,
                  },
                })}
                isActive={page !== currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href={handleNextPage()} isActive={!isLastPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  return null
}
