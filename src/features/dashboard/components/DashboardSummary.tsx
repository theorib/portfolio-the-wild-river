import {
  TodaySummary,
  TodaySummaryContent,
  TodaySummaryItem,
  TodaySummaryItemList,
  TodaySummaryTitle,
  TodaySummaryItemBadge,
  TodaySummaryItemFlag,
  TodaySummaryItemName,
  TodaySummaryItemNumber,
  TodaySummaryItemButton,
} from '@/features/dashboard/components/TodaySummary'
import { cn } from '@/shared/lib/utils'

const data = [
  { status: 'arrived', name: 'Jonas', flag: '🇨🇬', number: 7 },
  { status: 'arrived', name: 'David Smith', flag: '🇧🇷', number: 3 },
  { status: 'departing', name: 'Maria Chen', flag: '🇯🇵', number: 4 },
  { status: 'arrived', name: 'Luca Romano', flag: '🇮🇹', number: 2 },
  { status: 'departing', name: 'Sofia Patel', flag: '🇮🇳', number: 5 },
  { status: 'arrived', name: 'Henrik Nielsen', flag: '🇩🇰', number: 6 },
  { status: 'arrived', name: 'Yuki Tanaka', flag: '🇰🇷', number: 3 },
]

export default function DashboardSummary({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <TodaySummary className={cn('', className)} {...props}>
      <TodaySummaryContent>
        <TodaySummaryTitle>Today Summary</TodaySummaryTitle>
        <TodaySummaryItemList>
          <TodaySummaryItem className="text-sm">
            <span>Status</span>
            <span>Country</span>
            <span>Name</span>
            <span>Guests</span>
            <span></span>
          </TodaySummaryItem>
          {data.map(item => (
            <TodaySummaryItem key={item.name}>
              <TodaySummaryItemBadge>{item.status}</TodaySummaryItemBadge>
              <TodaySummaryItemFlag>{item.flag}</TodaySummaryItemFlag>
              <TodaySummaryItemName>{item.name}</TodaySummaryItemName>
              <TodaySummaryItemNumber>{item.number}</TodaySummaryItemNumber>
              <TodaySummaryItemButton>
                {item.status === 'arrived' ? 'check out' : 'check in'}
              </TodaySummaryItemButton>
            </TodaySummaryItem>
          ))}
        </TodaySummaryItemList>
      </TodaySummaryContent>
    </TodaySummary>
  )
}
