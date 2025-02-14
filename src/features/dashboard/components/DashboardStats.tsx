import {
  Stats,
  StatsHeader,
  StatsFooter,
  StatsTitle,
  StatsDescription,
  StatsContent,
} from '@/features/dashboard/components/Stats'
import { cn } from '@/lib/utils'

export default function DashboardStats({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'xs:grid-cols-2 md-lg:grid-cols-4 grid grid-cols-1 gap-4',
        className,
      )}
      {...props}
    >
      <Stats>
        <StatsHeader>
          <StatsTitle>Bookings</StatsTitle>
        </StatsHeader>
        <StatsContent>12</StatsContent>
        <StatsFooter>
          <StatsDescription>confirmed</StatsDescription>
        </StatsFooter>
      </Stats>
      <Stats>
        <StatsHeader>
          <StatsTitle>Sales</StatsTitle>
        </StatsHeader>
        <StatsContent>$42,620</StatsContent>
        <StatsFooter>
          <StatsDescription>as of 2023-01-01</StatsDescription>
        </StatsFooter>
      </Stats>
      <Stats>
        <StatsHeader>
          <StatsTitle>Check ins</StatsTitle>
        </StatsHeader>
        <StatsContent>6</StatsContent>
        <StatsFooter>
          <StatsDescription>as of 2023-01-01</StatsDescription>
        </StatsFooter>
      </Stats>
      <Stats>
        <StatsHeader>
          <StatsTitle>Ocupancy Rate</StatsTitle>
        </StatsHeader>
        <StatsContent>48%</StatsContent>
        <StatsFooter>
          {/* <StatsDescription>confirmed</StatsDescription> */}
        </StatsFooter>
      </Stats>
    </div>
  )
}
