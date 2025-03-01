'use client'

import BookingDetailsError from '@/features/bookings/bookingDetails/BookingDetailsError'
import { BookingDetailsSkeleton } from '@/features/bookings/bookingDetails/BookingDetailsSkeleton'
import BookingFlag from '@/features/bookings/components/BookingFlag'
import useBooking from '@/features/bookings/hooks/useBooking'
import useBookingDates from '@/features/bookings/hooks/useBookingDates'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  // CardHeader,
  // CardTitle,
} from '@/shared/components/ui/card'
import { cn } from '@/shared/lib/utils'
import { formatCurrency } from '@/shared/lib/utils/helpers'
import { format } from 'date-fns'
import { CircleCheck, CircleX, University } from 'lucide-react'
import Link from 'next/link'

import { useParams } from 'next/navigation'

export const BookingDetailsList = ({
  className,
  ...props
}: React.ComponentProps<'ul'>) => {
  return (
    <ul
      data-slot="booking-details-list"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  )
}
export const BookingDetailsListItem = ({
  className,
  ...props
}: React.ComponentProps<'li'>) => {
  return (
    <li
      data-slot="booking-details-list-item"
      className={cn(
        'flex items-center gap-1 after:mx-2 after:opacity-50 after:content-["•"] last:after:content-none',
        className,
      )}
      {...props}
    />
  )
}

export default function BookingDetails() {
  const { bookingId } = useParams<{ bookingId: string }>()

  const {
    data: booking,
    isLoading,
    status,
  } = useBooking({
    bookingId: parseInt(bookingId),
  })
  const {
    data: dates,
    success,
    error: datesError,
  } = useBookingDates({
    startDate: booking?.startDate,
    endDate: booking?.endDate,
    numNights: booking?.numNights,
  })

  if (isLoading) return <BookingDetailsSkeleton />

  if (status === 'error' || datesError) return <BookingDetailsError />

  if (status === 'success' && success && booking) {
    const { startDate, endDate, distance, stayLength } = dates

    return (
      <Card>
        <CardHeader className="bg-sidebar border-b">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <University />
              <span>
                {stayLength} nights in Cabin {booking.cabinId?.name}
              </span>
            </div>
            <span>{`${startDate} (${distance}) - ${endDate}`}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 py-10">
          <BookingDetailsList>
            <BookingDetailsListItem>
              <BookingFlag
                url={booking?.guestId?.countryFlag}
                nationality={booking?.guestId?.nationality}
                flagSize={25}
              />
            </BookingDetailsListItem>
            <BookingDetailsListItem>
              {booking?.guestId?.fullName}{' '}
              {booking?.numGuests ? `+ ${booking?.numGuests} guests` : null}
            </BookingDetailsListItem>

            <BookingDetailsListItem>
              <Link
                href={`mailto:${booking?.guestId?.email}`}
                className="underline underline-offset-3 after:no-underline"
              >
                {booking?.guestId?.email}
              </Link>
            </BookingDetailsListItem>
            <BookingDetailsListItem>
              {booking?.guestId?.nationalID
                ? `National ID: ${booking?.guestId.nationalID}`
                : null}
            </BookingDetailsListItem>
          </BookingDetailsList>

          <div className="flex items-center gap-2">
            {booking?.hasBreakfast ? <CircleCheck /> : <CircleX />}
            {`Breakfast included? ${booking?.hasBreakfast ? 'yes' : 'no'}`}
          </div>
          <div className="text-muted bg-muted-foreground rounded-xl p-6">
            {`Total price: ${formatCurrency(booking.totalPrice || 0)} (${formatCurrency(booking.cabinPrice || 0)} cabin + ${formatCurrency(booking.extrasPrice || 0)} extras)`}
            <span>{booking.isPaid ? 'Paid' : 'Not paid'}</span>
          </div>
        </CardContent>
        <CardFooter className="bg-sidebar border-t pt-6">
          Booked {format(new Date(booking.created_at), 'PPPPpppp')}
        </CardFooter>
      </Card>
    )
  }
}
