'use client'

import { BookingStatusBadge } from '@/features/bookings/components/BookingStatusBadge'
import useBooking from '@/features/bookings/hooks/useBooking'
import { BookingsStatusSchema } from '@/features/bookings/schema'
import { useParams } from 'next/navigation'

export default function BookingPageTitleBadge() {
  const { bookingId } = useParams<{ bookingId: string }>()

  const {
    data: booking,

    status,
  } = useBooking({
    bookingId: Number(bookingId),
  })

  const { success, data: bookingStatus } = BookingsStatusSchema.safeParse(
    booking?.status,
  )

  if (status === 'success' && success && booking) {
    return <BookingStatusBadge variant={bookingStatus} />
  }
  return null
}
