'use client'
import { bookingQuery } from '@/features/bookings/hooks/useBooking'
import useCheckInStatus from '@/features/bookings/hooks/useCheckInStatus'
import useDeleteBookingById from '@/features/bookings/hooks/useDeleteBookingById'
import {
  BookingsStatusSchema,
  type BookingsStatus,
} from '@/features/bookings/schema'
import { type Booking } from '@/services/supabase/supabase.types'
import useSupabaseBrowser from '@/services/supabase/supabaseBrowser'
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
import { useQueryClient } from '@tanstack/react-query'

import { EllipsisVertical, Eye, LogIn, LogOut, OctagonX } from 'lucide-react'
import { $path } from 'next-typesafe-url'
import Link from 'next/link'

type BookingListItemDropdownProps = {
  booking: Booking
}

type BookingStatusHandlerItem = {
  icon?: React.ReactNode | undefined
  label?: string | undefined
  onClickHandler?: (() => void) | undefined
  onHoverHandler?: (() => void) | undefined
}

type BookingStatusHandler = Record<BookingsStatus, BookingStatusHandlerItem>

export default function BookingsTableColumnActionsRowItem({
  booking,
}: BookingListItemDropdownProps) {
  const bookingId = booking.id
  const queryClient = useQueryClient()
  const supabaseClient = useSupabaseBrowser()
  const { mutate: mutateCheckIn } = useCheckInStatus({
    bookingId,
  })
  const { mutate: deleteBooking } = useDeleteBookingById({
    bookingId,
  })

  const { data: bookingStatus, error } = BookingsStatusSchema.safeParse(
    booking.status,
  )

  const prefetchBookingQuery = () => {
    void (async (): Promise<void> => {
      await queryClient.prefetchQuery({
        ...bookingQuery({
          supabaseClient,
          bookingId,
        }),
        // so we don't prefetch the same query every time the use hovers the item
        staleTime: 25 * 1000,
      })
    })()
  }

  if (!bookingStatus || error) {
    return null
  }

  const bookingStatusHandler: BookingStatusHandler = {
    'checked-out': {},
    'checked-in': {
      icon: <LogOut />,
      label: 'Check out',
      onClickHandler: () => {
        mutateCheckIn('checked-out')
      },
    },
    unconfirmed: {
      icon: <LogIn />,
      label: 'Check in',
      onClickHandler: () => {
        mutateCheckIn('checked-in')
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
          <DropdownMenuItem onMouseEnter={prefetchBookingQuery} asChild>
            <Link
              href={$path({
                route: '/app/bookings/[bookingId]',
                routeParams: { bookingId },
              })}
              className="flex cursor-pointer items-center gap-2"
            >
              <Eye />
              See Details
            </Link>
          </DropdownMenuItem>
          {bookingStatus && bookingStatus !== 'checked-out' ? (
            <DropdownMenuItem
              className="flex cursor-pointer items-center gap-2"
              onSelect={bookingStatusHandler[bookingStatus].onClickHandler}
              asChild
            >
              <button className="w-full">
                {bookingStatusHandler[bookingStatus].icon}
                <span>{bookingStatusHandler[bookingStatus].label}</span>
              </button>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem asChild className="cursor-pointer">
            <button className="w-full" onClick={() => deleteBooking()}>
              <OctagonX /> Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
