import DashboardStats from '@/features/dashboard/components/DashboardStats'
import DashboardSummary from '@/features/dashboard/components/DashboardSummary'
import SalesChart from '@/features/dashboard/components/SalesChart'
import StayChart from '@/features/dashboard/components/StayChart'
import {
  PageHeader,
  PageHeaderTitle,
} from '@/shared/components/ui-custom/PageHeader'
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/components/ui/toggle-group'
import { withParamValidation } from 'next-typesafe-url/app/hoc'
import { $path, type InferPagePropsType } from 'next-typesafe-url'
import { Route, type RouteType } from './routeType'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { createClient } from '@/services/supabase/supabaseServer'
import { bookingsAfterDateQuery } from '@/features/dashboard/hooks/useBookingsAfterDate'
import Link from 'next/link'

type PageProps = InferPagePropsType<RouteType>

async function DashboardPage({ searchParams }: PageProps) {
  const currentSearchParams = await searchParams

  const queryClient = new QueryClient()
  const supabaseClient = await createClient()

  await queryClient.prefetchQuery(
    bookingsAfterDateQuery({
      supabaseClient,
      days: currentSearchParams?.numDays,
    }),
  )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grid w-full grid-cols-4 gap-4">
        <PageHeader className="xs:flex-row col-span-4 flex w-full flex-col items-center justify-between gap-4 md:col-span-4">
          <PageHeaderTitle>Dashboard</PageHeaderTitle>
          <ToggleGroup
            type="single"
            defaultValue="Last 7 Days"
            variant="outline"
          >
            <Link
              href={$path({
                route: '/app/dashboard',
                searchParams: { numDays: 7 },
              })}
            >
              <ToggleGroupItem value="Last 7 Days">Last 7 Days</ToggleGroupItem>
            </Link>
            <Link
              href={$path({
                route: '/app/dashboard',
                searchParams: { numDays: 30 },
              })}
            >
              <ToggleGroupItem value="Last 30 Days">
                Last 30 Days
              </ToggleGroupItem>
            </Link>
            <Link
              href={$path({
                route: '/app/dashboard',
                searchParams: { numDays: 90 },
              })}
            >
              <ToggleGroupItem value="Last 90 Days">
                Last 90 Days
              </ToggleGroupItem>
            </Link>
          </ToggleGroup>
        </PageHeader>
        <DashboardStats className="col-span-4" />
        <DashboardSummary className="col-span-4 lg:col-span-2" />
        <StayChart className="col-span-4 lg:col-span-2" />
        <SalesChart className="col-span-4" />
      </div>
    </HydrationBoundary>
  )
}

export default withParamValidation(DashboardPage, Route)
