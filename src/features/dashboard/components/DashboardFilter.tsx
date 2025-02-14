import { Button } from '@/shared/components/ui/button'
import { cn } from '@/lib/utils'

export function DashboardFilter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dashboard-filter"
      className={cn(
        'bg-accent text-card-foreground flex items-center justify-between gap-1 rounded-xl border p-2 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

export function DashboardFilterButton({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <Button
      variant={'ghost'}
      size={'xs'}
      data-slot="dashboard-filter-button"
      className={cn(
        'data-active:bg-primary/90 data-active:text-primary-foreground hover:border-input hover:bg-background hover:text-accent-foreground border border-transparent transition-all duration-250 hover:shadow-xs',
        className,
      )}
      {...props}
    />
  )
}
