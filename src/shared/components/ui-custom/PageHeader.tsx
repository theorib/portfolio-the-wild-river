/* eslint-disable jsx-a11y/heading-has-content */
import { cn } from '@/lib/utils'

export function PageHeader({
  className,
  ...props
}: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="page-header"
      className={cn('flex items-center justify-between gap-2', className)}
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
      className={cn('text-3xl font-bold tracking-tight', className)}
      {...props}
    />
  )
}
