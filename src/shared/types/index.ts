export type ArrayElement<T> = T extends Array<infer U> ? U : never

export type Range = {
  startIndex: number
  endIndex: number
}

export type Sort<TData, TKey extends keyof TData = keyof TData> = {
  columnName: TKey
  ascending: boolean
}

export type Pagination<TData, Tkey extends keyof TData = keyof TData> = {
  numberOfItems: number
  columnName: Tkey
  range: Range
}

export type PaginationAndSort<TData> = {
  pagination: Pagination<TData>
  sort: Sort<TData>
}
