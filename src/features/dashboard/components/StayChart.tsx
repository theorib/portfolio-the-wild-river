'use client';

import type * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { Route } from '@/app/app/dashboard/routeType';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import useBookingsAfterDate from '@/features/dashboard/hooks/useBookingsAfterDate';
import { formatBookingDataForStays } from '@/features/dashboard/lib/formatChartsData';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next-typesafe-url/app';

export const chartConfig = {
	one: {
		label: '1 night',
		color: 'var(--chart-1)',
	},
	two: {
		label: '2 nights',
		color: 'var(--chart-2)',
	},
	three: {
		label: '3 nights',
		color: 'var(--chart-3)',
	},
	fourFive: {
		label: '4-5 nights',
		color: 'var(--chart-4)',
	},
	sixSeven: {
		label: '6-7 nights',
		color: 'var(--chart-5)',
	},
	eightFourteen: {
		label: '8-14 nights',
		color: 'var(--chart-6)',
	},
	fifteenTwentyOne: {
		label: '15-21 nights',
		color: 'var(--chart-7)',
	},
	twentyOnePlus: {
		label: '21+ nights',
		color: 'var(--chart-8)',
	},
} satisfies ChartConfig;

export default function StayChart({ className, ...props }: React.ComponentProps<'div'>) {
	const searchParams = useSearchParams(Route.searchParams);
	const numDays = searchParams.data?.numDays || 7;
	const { data, status, isError, isLoading } = useBookingsAfterDate({
		days: searchParams.data?.numDays,
	});

	if (status !== 'success' || !data) return null;

	const formattedData = formatBookingDataForStays(data);

	const totalVisitors = formattedData.reduce((acc, curr) => acc + curr.value, 0);

	return (
		<Card className={cn('col-span-2 flex flex-col', className)} {...props}>
			<CardHeader className="items-center pb-0">
				<CardTitle>Stay duration summary</CardTitle>
				{/* <CardDescription>January - June 2024</CardDescription> */}
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie
							data={formattedData}
							dataKey="value"
							nameKey="duration"
							innerRadius={60}
							strokeWidth={5}
						>
							<Label
								content={({ viewBox }) => {
									if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
										return (
											<text
												x={viewBox.cx}
												y={viewBox.cy}
												textAnchor="middle"
												dominantBaseline="middle"
											>
												<tspan
													x={viewBox.cx}
													y={viewBox.cy}
													className="fill-foreground text-3xl font-bold"
												>
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan
													x={viewBox.cx}
													y={(viewBox.cy || 0) + 24}
													className="fill-muted-foreground"
												>
													Stays
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			{/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total value for the last 6 months
        </div>
      </CardFooter> */}
		</Card>
	);
}
