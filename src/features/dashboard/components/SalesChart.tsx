'use client'

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/shared/components/ui/chart'
import { cn } from '@/shared/lib/utils'
import { useSearchParams } from 'next-typesafe-url/app'
import { Route } from '@/app/app/dashboard/routeType'
import useBookingsAfterDate from '@/features/dashboard/hooks/useBookingsAfterDate'
import { format, isSameDay, subDays } from 'date-fns'
import { getToday } from '@/shared/lib/utils/helpers'
import { formatBookingDataForSales as formatBookingDataForSalesChart } from '@/features/dashboard/lib/formatChartsData'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export default function SalesChart({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const searchParams = useSearchParams(Route.searchParams)
  const { data, status, isError, isLoading } = useBookingsAfterDate({
    days: searchParams.data?.numDays,
  })

  if (status === 'success' && data) {
    const numDays = searchParams.data?.numDays || 7

    const formattedData = formatBookingDataForSalesChart(data)

    return (
      <Card className={cn('col-span-4', className)} {...props}>
        <CardHeader>
          <CardTitle>
            {`Sales from ${format(subDays(new Date(), numDays), 'MMM dd, yyyy')} — 
            ${format(new Date(), 'MMM dd, yyyy')}`}
          </CardTitle>
          <CardDescription>
            {`Showing total sales for the last ${numDays} days`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={formattedData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              {/* <CartesianGrid vertical={false} /> */}
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="label"
                // tickLine={false}
                // axisLine={false}
                tickMargin={8}
                tickFormatter={(value: string) =>
                  format(new Date(value), 'MMM dd')
                }
              />
              <YAxis
                unit={'$'}
                // tick={{ fill: colors.text }}
                // tickLine={{ stroke: colors.text }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                type="natural"
                dataKey="totalSales"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="Total Sales"
                name="Total Sales"
                unit={'$'}
              />
              <Area
                type="natural"
                dataKey="extrasSales"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="Extra Sales"
                name="Extra Sales"
                unit={'$'}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Trending up by 5.2% this month{' '}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                January - June 2024
              </div>
            </div>
          </div>
        </CardFooter> */}
      </Card>
    )
  }
}
