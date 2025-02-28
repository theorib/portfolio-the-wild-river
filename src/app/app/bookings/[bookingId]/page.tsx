import BookingDetails from '@/features/bookings/bookingDetails/BookingDetails'
import BookingPageTitleBadge from '@/features/bookings/components/BookingPageTitleBadge'
import { bookingQuery } from '@/features/bookings/hooks/useBooking'
import { createClient } from '@/services/supabase/supabaseServer'
import {
  PageHeader,
  PageHeaderTitle,
} from '@/shared/components/ui-custom/PageHeader'
import { QueryClient } from '@tanstack/react-query'

type BookingPageProps = {
  params: Promise<{
    bookingId: string
  }>
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { bookingId } = await params

  const queryClient = new QueryClient()
  const supabaseClient = await createClient()

  await queryClient.prefetchQuery(
    bookingQuery({
      supabaseClient,
      bookingId: parseInt(bookingId),
    }),
  )

  return (
    <div>
      <PageHeader>
        <PageHeaderTitle className="flex items-center gap-6">
          Booking #{bookingId}
          <BookingPageTitleBadge />
        </PageHeaderTitle>
      </PageHeader>
      <BookingDetails />
    </div>
  )
}
