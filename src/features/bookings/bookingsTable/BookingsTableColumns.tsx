'use client'

import {
  BookingTableItemCellLight,
  BookingTableItemCellBold,
  BookingsTableItemCellContainer,
} from '@/features/bookings/bookingsTable/BookingsTableItemsCell'
import { BookingsStatusSchema } from '@/features/bookings/schema'
import { type Booking } from '@/services/supabase/supabase.types'

import { cn } from '@/shared/lib/utils'
import { formatCurrency } from '@/shared/lib/utils/helpers'
import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { z } from 'zod'
import BookingsTableColumnActionsRowItem from '@/features/bookings/bookingsTable/BookingsTableColumnActionsRowItem'
import BookingsTableColumnDates from '@/features/bookings/bookingsTable/BookingsTableColumnDatesRowItem'
import { BookingStatusBadge } from '@/features/bookings/components/BookingStatusBadge'
import { DataTableColumnHeader } from '@/features/dataTable/components/DataTableColumnHeader'

const columnHelper = createColumnHelper<Booking>()

export const bookingsTableColumns = [
  columnHelper.accessor('id', {
    id: 'bookingId',
    sortingFn: 'alphanumeric',

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Booking ID" />
    ),
    cell: props => props.getValue(),
  }),

  columnHelper.accessor('cabinId', {
    id: 'cabin',
    sortingFn: 'alphanumeric',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cabin" />
    ),
    cell: props => props.getValue(),
  }),

  columnHelper.accessor(
    row => {
      return { fullName: row.guestId?.fullName, email: row.guestId?.email }
    },
    {
      id: 'guest',
      sortingFn: (a, b) => {
        const aFullName = a.original.guestId?.fullName
        const bFullName = b.original.guestId?.fullName
        const aEmail = a.original.guestId?.email
        const bEmail = b.original.guestId?.email
        if (aFullName && bFullName) {
          return aFullName.localeCompare(bFullName)
        }
        if (aEmail && bEmail) {
          return aEmail.localeCompare(bEmail)
        }
        return 0
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Guest" />
      ),
      cell: props => {
        const { data: email, success } = z
          .string()
          .email()
          .safeParse(props.getValue().email)

        return (
          <BookingsTableItemCellContainer>
            <BookingTableItemCellBold>
              {props.getValue().fullName}
            </BookingTableItemCellBold>
            <BookingTableItemCellLight>
              {success ? <Link href={`mailto:${email}`}>{email}</Link> : null}
            </BookingTableItemCellLight>
          </BookingsTableItemCellContainer>
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
      id: 'dates',
      sortingFn: (rowA, rowB) => {
        const today = new Date().toLocaleString()
        const aDate = new Date(rowA.original?.startDate || today)
        const bDate = new Date(rowB.original?.startDate || today)
        return aDate.getTime() - bDate.getTime()
      },

      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Dates" />
      ),
      cell: props => (
        <BookingsTableColumnDates bookingDates={props.getValue()} />
      ),
    },
  ),

  columnHelper.accessor('status', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: props => {
      const {
        success,
        data: status,
        error,
      } = BookingsStatusSchema.safeParse(props.getValue())

      if (error) return null

      if (success && status)
        return (
          <BookingStatusBadge
            className={cn('inline-flex font-bold')}
            variant={status}
            size="full-width"
          >
            {status}
          </BookingStatusBadge>
        )
    },
  }),
  columnHelper.accessor('totalPrice', {
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
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
      const booking = props.row.original
      return <BookingsTableColumnActionsRowItem booking={booking} />
    },
  }),
]
export type BookingColumns = typeof bookingsTableColumns
