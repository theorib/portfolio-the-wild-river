import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { useSearchParams } from 'next-typesafe-url/app'
import { Route } from '@/app/app/bookings/routeType'
import { $path } from 'next-typesafe-url'
import { useRouter } from 'next/navigation'

export function BookingsTableItemsPerPage() {
  const { data: searchParams, isLoading } = useSearchParams(Route.searchParams)
  const router = useRouter()

  if (!isLoading && searchParams?.pagination) {
    const { pagination } = searchParams

    const handleChange = (value: string) => {
      const newUrl = $path({
        route: '/app/bookings',
        searchParams: {
          ...searchParams,
          pagination: {
            ...pagination,
            numberOfItems: parseInt(value),
          },
        },
      })
      router.push(newUrl)
      //
    }

    return (
      <div className="flex items-center gap-2">
        <span>Page Size</span>
        <Select
          defaultValue={String(pagination.numberOfItems)}
          onValueChange={handleChange}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Items per Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Items per page</SelectLabel>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value={'25'}>25</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    )
  }

  return null
}
