import { useParams } from 'next/navigation'

export default function BookingDetailsError() {
  const { bookingId } = useParams<{ bookingId: string }>()
  return <div>Error retrieving booking #{bookingId}</div>
}
