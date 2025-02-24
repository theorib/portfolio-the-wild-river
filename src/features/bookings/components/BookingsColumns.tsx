'use client'
import {
  BookingDataCellLight,
  BookingDataCellBold,
  BookingDataCellContainer,
} from '@/features/bookings/components/BookingCellItems'
import { type Booking } from '@/services/supabase/supabase.types'
import { formatDistanceFromNow } from '@/shared/lib/utils/helpers'
import { createColumnHelper } from '@tanstack/react-table'
import { format, isToday } from 'date-fns'

const columnHelper = createColumnHelper<Booking>()

export const bookingsColumns = [
  columnHelper.accessor('cabinId', {
    header: 'Cabin',
    cell: props => props.getValue(),
    // cell: props => props.cell.row.original.cabinId,
  }),

  columnHelper.accessor(
    row => {
      return { fullName: row.guestId?.fullName, email: row.guestId?.email }
    },
    {
      header: 'Guest',
      cell: props => {
        return (
          <BookingDataCellContainer>
            <BookingDataCellBold>
              {props.getValue().fullName}
            </BookingDataCellBold>
            <BookingDataCellLight>
              {props.getValue().email}
            </BookingDataCellLight>
          </BookingDataCellContainer>
        )
      },
    },
  ),
  // columnHelper.accessor('guestId.email', {
  //   header: 'Email',
  //   cell: props => props.getValue(),
  // }),
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
      //     cell: props => props.cell.row.original.cabinId,
    },
  ),
  // columnHelper.accessor('endDate', {
  //   header: 'End date',
  //   cell: props => props.getValue(),
  // }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: props => props.getValue(),
  }),
  columnHelper.accessor('totalPrice', {
    header: 'Amount',
    cell: props => props.getValue(),
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
