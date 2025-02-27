type PageProps = {
  params: Promise<{ bookingId: string }>
}

export default async function page({ params }: PageProps) {
  const bookingId = (await params).bookingId

  return <div>I am the booking page for booking: {bookingId}</div>
}
