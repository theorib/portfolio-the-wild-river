/* eslint-disable jsx-a11y/heading-has-content */
import { cn } from '@/shared/lib/utils'

export function PageHeader({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="page-header"
      className={cn(
        'mb-4 flex items-center justify-between gap-2 uppercase',
        className,
      )}
      {...props}
    />
  )
}

export function PageHeaderTitle({
  className,
  ...props
}: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="page-header-title"
      className={cn('text-3xl font-bold uppercase', className)}
      {...props}
    />
  )
}
