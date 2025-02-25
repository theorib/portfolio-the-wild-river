'use client'

import {
  BookingDataCellLight,
  BookingDataCellBold,
  BookingDataCellContainer,
} from '@/features/bookings/components/BookingCellItems'
import { BookingsStatusSchema } from '@/features/bookings/schema'
import { type Booking } from '@/services/supabase/supabase.types'
import { Badge } from '@/shared/components/ui/badge'

import { cn } from '@/shared/lib/utils'
import {
  formatCurrency,
  formatDistanceFromNow,
} from '@/shared/lib/utils/helpers'
import {
  DropdownMenu,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from '@/shared/components/ui/dropdown-menu'
import { createColumnHelper } from '@tanstack/react-table'

import { format, isToday } from 'date-fns'
import Link from 'next/link'

import { z } from 'zod'
import { Button } from '@/shared/components/ui/button'
import { EllipsisVertical, Eye, LogOut, OctagonX } from 'lucide-react'

const columnHelper = createColumnHelper<Booking>()

export const bookingsColumns = [
  columnHelper.accessor('cabinId', {
    header: 'Cabin',
    cell: props => props.getValue(),
  }),

  columnHelper.accessor(
    row => {
      return { fullName: row.guestId?.fullName, email: row.guestId?.email }
    },
    {
      header: 'Guest',
      cell: props => {
        const { data: email, success } = z
          .string()
          .email()
          .safeParse(props.getValue().email)

        return (
          <BookingDataCellContainer>
            <BookingDataCellBold>
              {props.getValue().fullName}
            </BookingDataCellBold>
            <BookingDataCellLight>
              {success ? <Link href={`mailto:${email}`}>{email}</Link> : null}
            </BookingDataCellLight>
          </BookingDataCellContainer>
        )
      },
    },
  ),

  columnHelper.accessor(
    row => ({
      startDate: row.startDate,
      endDate: row.endDate,
      numNights: row.numNights,
    }),
    {
      header: 'Dates',
      cell: props => {
        const startDateAsDate = new Date(props.renderValue()?.startDate ?? '')
        const startDate = format(new Date(startDateAsDate), 'MMM dd yyyy')
        const endDateAsDate = new Date(props.renderValue()?.endDate ?? '')
        const endDate = format(new Date(endDateAsDate ?? ''), 'MMM dd yyyy')

        const distance = isToday(startDateAsDate)
          ? 'Today'
          : formatDistanceFromNow(startDateAsDate)
        const stayLength = String(props.renderValue()?.numNights)

        return (
          <BookingDataCellContainer className="grid grid-cols-[max-content_max-content_max-content]">
            <div className="contents">
              <BookingDataCellBold>{distance}</BookingDataCellBold>
              <BookingDataCellBold>&mdash;</BookingDataCellBold>
              <BookingDataCellBold>{stayLength} night stay</BookingDataCellBold>
            </div>
            <div className="contents">
              <BookingDataCellLight>{startDate}</BookingDataCellLight>
              <BookingDataCellLight>&mdash;</BookingDataCellLight>
              <BookingDataCellLight>{endDate}</BookingDataCellLight>
            </div>
          </BookingDataCellContainer>
        )
      },
    },
  ),

  columnHelper.accessor('status', {
    header: 'Status',
    cell: props => {
      const {
        success,
        data: status,
        error,
      } = BookingsStatusSchema.safeParse(props.getValue())

      if (error) return null

      const variant = {
        'checked-out': 'bg-zinc-200 text-zinc-800',
        'checked-in': 'bg-green-200 text-green-800',
        unconfirmed: 'bg-sky-200 text-blue-800',
      }

      if (success && status)
        return (
          <Badge className={cn('inline-flex font-bold', variant[status])}>
            {status}
          </Badge>
        )
    },
  }),
  columnHelper.accessor('totalPrice', {
    header: 'Amount',
    cell: props => {
      const {
        data: amount,
        error,
        success,
      } = z
        .number()
        .transform(value => formatCurrency(value))
        .safeParse(props.getValue())

      if (error) return null

      if (success && amount)
        return <span className="font-bold opacity-65">{amount}</span>
    },
  }),

  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: props => {
      console.log(props.row.original.id)
      const bookingId = props.row.original.id

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
                {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut /> Check out
                {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <OctagonX /> Delete
                {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }),
  // columnHelper.accessor('numNights', {
  //   header: 'Nights',
  //   cell: props => props.getValue(),
  // }),
  // columnHelper.accessor('numGuests', {
  //   header: 'Guests',
  //   cell: props => props.getValue(),
  // }),
]
export type BookingColumns = typeof bookingsColumns
