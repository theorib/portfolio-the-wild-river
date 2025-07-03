import { chartConfig } from '@/features/dashboard/components/StayChart'
import { format, isSameDay } from 'date-fns'

export type BookingData = {
  created_at: string
  numNights: number | null
  totalPrice: number | null
  extrasPrice: number | null
}

export type FormattedBookingDataForSales = {
  label: string
  totalSales: number
  extrasSales: number
}

export type FormattedBookingDataForStays = {
  duration:
    | 'one'
    | 'two'
    | 'three'
    | 'fourFive'
    | 'sixSeven'
    | 'eightFourteen'
    | 'fifteenTwentyOne'
    | 'twentyOnePlus'
  value: number
  fill: string
}

export const formatBookingDataForSales = (
  bookingData: Array<BookingData>,
): Array<FormattedBookingDataForSales> => {
  const formattedData = bookingData.map(entry => {
    const label = format(entry.created_at, 'MMM dd')

    const sameDays = bookingData.filter(booking =>
      isSameDay(booking.created_at, new Date(entry.created_at)),
    )
    const totalSales = sameDays.reduce(
      (acc, booking) => acc + booking.totalPrice!,
      0,
    )
    const extrasSales = sameDays.reduce(
      (acc, booking) => acc + booking.extrasPrice!,
      0,
    )
    return {
      label,
      totalSales,
      extrasSales,
    }
  })

  return formattedData
}

export const formatBookingDataForStays = (
  bookingData: Array<BookingData>,
): Array<FormattedBookingDataForStays> => {
  const result: Array<FormattedBookingDataForStays> = [
    { duration: 'one', value: 0, fill: chartConfig.one.color },
    { duration: 'two', value: 0, fill: chartConfig.two.color },
    { duration: 'three', value: 0, fill: chartConfig.three.color },
    { duration: 'fourFive', value: 0, fill: chartConfig.fourFive.color },
    { duration: 'sixSeven', value: 0, fill: chartConfig.sixSeven.color },
    {
      duration: 'eightFourteen',
      value: 0,
      fill: chartConfig.eightFourteen.color,
    },
    {
      duration: 'fifteenTwentyOne',
      value: 0,
      fill: chartConfig.fifteenTwentyOne.color,
    },
    {
      duration: 'twentyOnePlus',
      value: 0,
      fill: chartConfig.twentyOnePlus.color,
    },
  ]

  bookingData.forEach(entry => {
    if (!entry.numNights) return
    const nights = entry.numNights
    if (nights === 1) {
      result[0].value++
    } else if (nights === 2) {
      result[1].value++
    } else if (nights === 3) {
      result[2].value++
    } else if (nights >= 4 && nights <= 5) {
      result[3].value++
    } else if (nights >= 6 && nights <= 7) {
      result[4].value++
    } else if (nights >= 8 && nights <= 14) {
      result[5].value++
    } else if (nights >= 15 && nights <= 21) {
      result[6].value++
    } else if (nights > 21) {
      result[7].value++
    }
  })
  return result
}
