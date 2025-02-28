import Image from 'next/image'
import { z } from 'zod'

type BookingFlagProps = {
  url: unknown
  nationality: unknown
}

export default function BookingFlag({ url, nationality }: BookingFlagProps) {
  const {
    data: parsedUrl,
    success: urlSuccess,
    error: urlError,
  } = z.string().url().safeParse(url)

  const {
    data: parsedNationality,
    success,
    error: nationalityError,
  } = z.string().safeParse(nationality)

  if (urlError || nationalityError) return null

  if (success && urlSuccess)
    return (
      <Image
        src={parsedUrl}
        alt={`${parsedNationality} country flag`}
        width={20}
        height={20}
      />
    )
}
