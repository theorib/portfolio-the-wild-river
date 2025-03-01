import Image from 'next/image'
import { z } from 'zod'

type BookingFlagProps = {
  url: unknown
  nationality: unknown
  flagSize?: number
}

export default function BookingFlag({
  url,
  nationality,
  flagSize = 20,
}: BookingFlagProps) {
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
        width={flagSize}
        height={flagSize}
      />
    )
}
