import { DatesColumnDataSchema } from '@/features/bookings/schema'
import { formatDistanceFromNow } from '@/shared/lib/utils/helpers'
import { format, isToday } from 'date-fns'
import { ZodError } from 'zod'
import { fromError } from 'zod-validation-error'

export type BookingDatesInput = {
  startDate: unknown
  endDate: unknown
  numNights: unknown
}

export type BookingDatesOutput = {
  startDate: string
  endDate: string
  distance: string
  stayLength: string
}

type UseBookingDatesSuccess = {
  data: BookingDatesOutput
  success: true
  error: undefined
}
type UseBookingDatesError = {
  data: undefined
  success: false
  error: Error
}

type BookingDatesFormat = {
  startDate?: string
  endDate?: string
}

type UseBookingDatesProps = {
  bookingDates: BookingDatesInput
  bookingDatesFormat?: BookingDatesFormat
}

type UseBookingDatesReturn = UseBookingDatesSuccess | UseBookingDatesError

export default function useBookingDates({
  bookingDates,
  bookingDatesFormat,
}: UseBookingDatesProps): UseBookingDatesReturn {
  try {
    const dates = DatesColumnDataSchema.parse({
      startDate: bookingDates?.startDate,
      endDate: bookingDates?.endDate,
      numNights: bookingDates?.numNights,
    })

    const formattedStartDate = format(
      new Date(dates.startDate || ''),
      bookingDatesFormat?.startDate || 'MMM dd yyyy',
    )
    const formattedEndDate = format(
      new Date(dates.endDate || ''),
      bookingDatesFormat?.endDate || 'MMM dd yyyy',
    )
    const distance = isToday(dates.startDate)
      ? 'Today'
      : formatDistanceFromNow(dates.startDate)
    const stayLength = String(dates.numNights)

    return {
      data: {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        distance,
        stayLength,
      },
      success: true,
      error: undefined,
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        data: undefined,
        success: false,
        error: fromError(error),
      }
    }

    const newError = new Error('Something went wrong', { cause: error })

    return {
      data: undefined,
      success: false,
      error: newError,
    }
  }
}
