import { DatesColumnDataSchema } from '@/features/bookings/schema'
import { type Booking } from '@/services/supabase/supabase.types'
import { formatDistanceFromNow } from '@/shared/lib/utils/helpers'
import { format, isToday } from 'date-fns'
import { ZodError } from 'zod'
import { fromError } from 'zod-validation-error'

export type BookingDates = {
  startDate: string
  endDate: string
  distance: string
  stayLength: string
}

type UseBookingDatesSuccess = {
  data: BookingDates
  success: true
  error: undefined
}
type UseBookingDatesError = {
  data: undefined
  success: false
  error: Error
}

type UseBookingDatesReturn = UseBookingDatesSuccess | UseBookingDatesError

export default function useBookingDates(
  booking: Booking,
): UseBookingDatesReturn {
  try {
    const dates = DatesColumnDataSchema.parse({
      startDate: booking?.startDate,
      endDate: booking?.endDate,
      numNights: booking?.numNights,
    })

    const formattedStartDate = format(
      new Date(dates.startDate || ''),
      'MMM dd yyyy',
    )
    const formattedEndDate = format(
      new Date(dates.endDate || ''),
      'MMM dd yyyy',
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
