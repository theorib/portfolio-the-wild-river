import {
  BookingsStatusSchema,
  type BookingsStatus,
} from '@/features/bookings/schema'
import { type Booking } from '@/services/supabase/supabase.types'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/shared/components/ui/dropdown-menu'

import { EllipsisVertical, Eye, LogIn, LogOut, OctagonX } from 'lucide-react'
import Link from 'next/link'

type BookingListItemDropdownProps = {
  booking: Booking
}

type BookingStatusHandlerItem = {
  icon: React.ReactNode | undefined
  label: string | undefined
  onClickHandler: (() => void) | undefined
}

type BookingStatusHandler = Record<BookingsStatus, BookingStatusHandlerItem>

export default function BookingsTableColumnActionsRowItem({
  booking,
}: BookingListItemDropdownProps) {
  const bookingId = booking.id
  const { data: bookingStatus, error } = BookingsStatusSchema.safeParse(
    booking.status,
  )

  if (!bookingStatus || error) {
    return null
  }

  const bookingStatusHandler: BookingStatusHandler = {
    'checked-out': {
      icon: undefined,
      label: undefined,
      onClickHandler: undefined,
    },
    'checked-in': {
      icon: <LogOut />,
      label: 'Check out',
      onClickHandler: () => {
        console.log('checking out')
      },
    },
    unconfirmed: {
      icon: <LogIn />,
      label: 'Check in',
      onClickHandler: () => {
        console.log('checking in')
      },
    },
  } as const

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{`Booking #${bookingId}`}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={`bookings/${bookingId}`}
              className="flex items-center gap-2"
            >
              <Eye />
              See Details
            </Link>
          </DropdownMenuItem>
          {bookingStatus && bookingStatus !== 'checked-out' ? (
            <DropdownMenuItem
              className="flex items-center gap-2"
              onSelect={bookingStatusHandler[bookingStatus].onClickHandler}
            >
              {bookingStatusHandler[bookingStatus].icon}
              <span>{bookingStatusHandler[bookingStatus].label}</span>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem>
            <OctagonX /> Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
