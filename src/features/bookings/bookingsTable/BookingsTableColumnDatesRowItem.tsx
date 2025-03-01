'use client'
import {
  BookingsTableItemCellContainer,
  BookingTableItemCellBold,
  BookingTableItemCellError,
  BookingTableItemCellLight,
} from '@/features/bookings/bookingsTable/BookingsTableItemsCell'

import useBookingDates, {
  type BookingDatesInput,
} from '@/features/bookings/hooks/useBookingDates'

type BookingsTableColumnDatesProps = {
  bookingDates: BookingDatesInput
}

export default function BookingsTableColumnDates({
  bookingDates,
}: BookingsTableColumnDatesProps) {
  const { data, success, error } = useBookingDates({ bookingDates })

  if (error) {
    return (
      <BookingTableItemCellError error={error}>
        Invalid Dates
      </BookingTableItemCellError>
    )
  }

  if (success) {
    const { startDate, endDate, distance, stayLength } = data

    return (
      <BookingsTableItemCellContainer className="grid grid-cols-[max-content_max-content_max-content]">
        <div className="contents">
          <BookingTableItemCellBold>{distance}</BookingTableItemCellBold>
          <BookingTableItemCellBold>&mdash;</BookingTableItemCellBold>
          <BookingTableItemCellBold>
            {stayLength} night stay
          </BookingTableItemCellBold>
        </div>
        <div className="contents">
          <BookingTableItemCellLight>{startDate}</BookingTableItemCellLight>
          <BookingTableItemCellLight>&mdash;</BookingTableItemCellLight>
          <BookingTableItemCellLight>{endDate}</BookingTableItemCellLight>
        </div>
      </BookingsTableItemCellContainer>
    )
  }
}
