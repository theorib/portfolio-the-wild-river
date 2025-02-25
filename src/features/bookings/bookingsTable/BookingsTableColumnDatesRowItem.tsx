import {
  BookingsTableItemCellContainer,
  BookingTableItemCellBold,
  BookingTableItemCellLight,
} from '@/features/bookings/bookingsTable/BookingsTableItemsCell'
import { format, isToday } from 'date-fns'
import { formatDistanceFromNow } from '@/shared/lib/utils/helpers'

type BookingsTableColumnDatesProps = {
  data: {
    startDate: Date
    endDate: Date
    numNights: number
  }
}

export default function BookingsTableColumnDates({
  data,
}: BookingsTableColumnDatesProps) {
  const { startDate, endDate, numNights } = data

  const formattedStartDate = format(new Date(startDate), 'MMM dd yyyy')

  const formattedEndDate = format(new Date(endDate), 'MMM dd yyyy')

  const distance = isToday(startDate)
    ? 'Today'
    : formatDistanceFromNow(startDate)
  const stayLength = String(numNights)

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
        <BookingTableItemCellLight>
          {formattedStartDate}
        </BookingTableItemCellLight>
        <BookingTableItemCellLight>&mdash;</BookingTableItemCellLight>
        <BookingTableItemCellLight>
          {formattedEndDate}
        </BookingTableItemCellLight>
      </div>
    </BookingsTableItemCellContainer>
  )
}
