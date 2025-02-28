import type * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/shared/lib/utils'

const bookingStatusBadgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 transition-[color,box-shadow] shadow-sm [a&]:hover:bg-primary/90 border-transparent ',
  {
    variants: {
      variant: {
        'checked-out': 'bg-zinc-200 text-zinc-800 ',
        'checked-in': 'bg-green-200 text-green-800',
        unconfirmed: 'bg-sky-200 text-blue-800',
      },
      size: {
        default: 'h-6 px-2 py-0.5 text-xs inline-flex font-bold',
        'full-width': 'h-6 px-2 py-0.5 w-full text-xs inline-flex font-bold',
      },
    },
    defaultVariants: {
      variant: 'unconfirmed',
      size: 'default',
    },
  },
)

function BookingStatusBadge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof bookingStatusBadgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  const nameLookup = {
    'checked-out': 'Checked Out',
    'checked-in': 'Checked In',
    unconfirmed: 'Unconfirmed',
  }

  return (
    <Comp
      data-slot="badge"
      className={cn(bookingStatusBadgeVariants({ variant, size }), className)}
      {...props}
    >
      {nameLookup[variant ?? 'unconfirmed']}
    </Comp>
  )
}

export { BookingStatusBadge, bookingStatusBadgeVariants }
