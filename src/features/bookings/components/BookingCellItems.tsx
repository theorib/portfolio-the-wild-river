import { cn } from '@/shared/lib/utils'

export function BookingDataCellContainer({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="booking-data-cell-container"
      className={cn('flex flex-col gap-1', className)}
      {...props}
    />
  )
}

export function BookingDataCellBold({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="booking-data-cell-bold"
      className={cn('font-bold', className)}
      {...props}
    />
  )
}

export function BookingDataCellLight({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="booking-data-cell-light"
      className={cn('opacity-70', className)}
      {...props}
    />
  )
}
