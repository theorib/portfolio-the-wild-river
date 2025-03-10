import { DEFAULT_BOOKING_ITEMS_PER_PAGE } from '@/shared/constants'
import { type Dispatch, type SetStateAction, useState } from 'react'

export type Pagination = {
  pageIndex: number
  pageSize: number
}

export default function usePagination(): [
  Pagination,
  Dispatch<SetStateAction<Pagination>>,
] {
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0, //initial page index
    pageSize: DEFAULT_BOOKING_ITEMS_PER_PAGE, //default page size
  })
  return [pagination, setPagination]
}
