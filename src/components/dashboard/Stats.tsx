import type * as React from 'react'

import { cn } from '@/lib/utils'

function Stats({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stats"
      className={cn(
        'bg-card text-stats-foreground rounded-xl border shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function StatsHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stats-header"
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  )
}

function StatsTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stats-title"
      className={cn('leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  )
}

function StatsDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stats-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function StatsContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stats-content"
      className={cn('p-6 pt-0 text-4xl', className)}
      {...props}
    />
  )
}

function StatsFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="stats-footer"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
}

export {
  Stats,
  StatsHeader,
  StatsFooter,
  StatsTitle,
  StatsDescription,
  StatsContent,
}
