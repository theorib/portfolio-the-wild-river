'use client'

import BookingDetailsError from '@/features/bookings/bookingDetails/BookingDetailsError'
import { BookingDetailsSkeleton } from '@/features/bookings/bookingDetails/BookingDetailsSkeleton'
import useBooking from '@/features/bookings/hooks/useBooking'
import { DatesColumnDataSchema } from '@/features/bookings/schema'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { format } from 'date-fns'
import { useParams } from 'next/navigation'

export default function BookingDetails() {
  const { bookingId } = useParams<{ bookingId: string }>()

  const {
    data: booking,
    isLoading,
    status,
  } = useBooking({
    bookingId: Number(bookingId),
  })

  if (isLoading) return <BookingDetailsSkeleton />

  if (status === 'error') return <BookingDetailsError />

  if (status === 'success' && booking) {
    // const { data, success, error } = DatesColumnDataSchema.safeParse({
    //   startDate: booking?.startDate,
    //   endDate: booking?.endDate,
    //   numNights: booking?.numNights,
    // })

    // const formattedStartDate = format(
    //   new Date(data.startDate || ''),
    //   'MMM dd yyyy',
    // )

    // const formattedEndDate = format(new Date(data.endDate || ''), 'MMM dd yyyy')

    // const distance = isToday(startDate)
    //   ? 'Today'
    //   : formatDistanceFromNow(startDate)
    // const stayLength = String(data.numNights)

    return (
      <Card>
        <CardContent>
          {/* <CardHeader>
            <CardTitle>Booking #{booking.id}</CardTitle>
          </CardHeader> */}
          <h2>
            {booking.numNights} nights in cabin {booking.cabinId?.name}
          </h2>
          <div></div>
          <div>Name: {booking.guestId?.fullName}</div>
          <div>{booking.guestId?.email}</div>
        </CardContent>
      </Card>
    )
  }
}
