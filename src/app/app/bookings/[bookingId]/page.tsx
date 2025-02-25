export default function page({ params }: { params: { bookingId: string } }) {
  return <div>I am the booking page for booking: {params.bookingId}</div>
}
