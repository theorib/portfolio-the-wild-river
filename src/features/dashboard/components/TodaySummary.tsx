import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

function TodaySummaryItemList({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="today-summary-item"
      className={cn(
        'grid grid-cols-[max-content_max-content_10fr_5fr_max-content] items-center gap-2',
        className,
      )}
      {...props}
    />
  )
}

function TodaySummaryItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="today-summary-item"
      className={cn('contents', className)}
      {...props}
    />
  )
}
function TodaySummaryItemBadge({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <Badge
      data-slot="today-summary-item-badge"
      className={cn('uppercase', className)}
      {...props}
    />
  )
}
function TodaySummaryItemFlag({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="today-summary-item-flag"
      className={cn('text-3xl', className)}
      {...props}
    />
  )
}
function TodaySummaryItemName({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return <span className={cn('text-base', className)} {...props} />
}

function TodaySummaryItemNumber({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn('justify-self-center text-base', className)}
      {...props}
    />
  )
}
function TodaySummaryItemButton({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return <Button size="xs" className={cn('uppercase', className)} {...props} />
}

function TodaySummaryTitle({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="today-summary-title"
      className={cn(
        'tracking-tights text-xl leading-none font-semibold',
        className,
      )}
      {...props}
    />
  )
}

function TodaySummaryContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stats-content"
      className={cn('p-6 text-4xl', className)}
      {...props}
    />
  )
}

function TodaySummary({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="today-summary"
      className={cn(
        'bg-card text-stats-foreground rounded-xl border shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

export {
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
}
