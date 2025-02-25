'use client'

import {
  BookingTableItemCellLight,
  BookingTableItemCellBold,
  BookingsTableItemCellContainer,
  BookingTableItemCellError,
} from '@/features/bookings/bookingsTable/BookingsTableItemsCell'
import {
  BookingsStatusSchema,
  DatesColumnDataSchema,
} from '@/features/bookings/schema'
import { type Booking } from '@/services/supabase/supabase.types'
import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/lib/utils'
import { formatCurrency } from '@/shared/lib/utils/helpers'
import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { z } from 'zod'
import BookingsTableColumnActionsRowItem from '@/features/bookings/bookingsTable/BookingsTableColumnActionsRowItem'
import BookingsTableColumnDates from '@/features/bookings/bookingsTable/BookingsTableColumnDatesRowItem'
import { fromError } from 'zod-validation-error'

const columnHelper = createColumnHelper<Booking>()

export const bookingsTableColumns = [
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
      header: 'Dates',
      cell: props => {
        const { data, success, error } = DatesColumnDataSchema.safeParse(
          props.renderValue(),
        )
        if (error)
          return (
            <BookingTableItemCellError error={fromError(error)}>
              Invalid Dates
            </BookingTableItemCellError>
          )
        if (success && data) return <BookingsTableColumnDates data={data} />
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
      const booking = props.row.original
      return <BookingsTableColumnActionsRowItem booking={booking} />
    },
  }),
]
export type BookingColumns = typeof bookingsTableColumns
