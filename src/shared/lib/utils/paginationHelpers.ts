import type { PaginationAndSort } from '@/shared/types'

export const getNextPaginationAndSort = <TData>(
  currentPaginationAndSort: PaginationAndSort<TData>,
) => {
  const previousPagePaginationAndSort = {
    ...currentPaginationAndSort,
    pagination: {
      columnName: currentPaginationAndSort.pagination.columnName,
      range: {
        startIndex:
          currentPaginationAndSort.pagination.range.startIndex +
          currentPaginationAndSort.pagination.numberOfItems,
        endIndex:
          currentPaginationAndSort.pagination.range.endIndex +
          currentPaginationAndSort.pagination.numberOfItems,
      },
      numberOfItems: currentPaginationAndSort.pagination.numberOfItems,
    },
  }
  return previousPagePaginationAndSort
}

export const getPreviousPaginationAndSort = <TData>(
  currentPaginationAndSort: PaginationAndSort<TData>,
) => {
  const nextPagePaginationAndSort = {
    ...currentPaginationAndSort,
    pagination: {
      columnName: currentPaginationAndSort.pagination.columnName,
      range: {
        startIndex:
          currentPaginationAndSort.pagination.range.startIndex -
          currentPaginationAndSort.pagination.numberOfItems,
        endIndex:
          currentPaginationAndSort.pagination.range.endIndex -
          currentPaginationAndSort.pagination.numberOfItems,
      },
      numberOfItems: currentPaginationAndSort.pagination.numberOfItems,
    },
  }
  return nextPagePaginationAndSort
}
