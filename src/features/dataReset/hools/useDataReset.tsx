'use client'

import { useState } from 'react'
import { isFuture, isPast, isToday } from 'date-fns'

import { guests } from '@/features/dataReset/data/data-guests'
import { createClient } from '@/services/supabase/supabaseClient'
import { bookings } from '@/features/dataReset/data/data-bookings'
import { cabins } from '@/features/dataReset/data/data-cabins'
import logger from '@/features/logger'
import { subtractDates } from '@/shared/lib/utils/helpers'

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };
const supabase = createClient()

async function deleteGuests() {
  logger.info('Deleting guests...')
  const { error, count, statusText, status } = await supabase
    .from('guests')
    .delete()
    .gt('id', 0)
  if (error) {
    logger.withError(error)
  } else {
    logger.withContext({ statusText, status }).info(`Deleted ${count} guests`)
  }
}

async function deleteCabins() {
  logger.info('Deleting cabins...')
  const { error, count, statusText, status } = await supabase
    .from('cabins')
    .delete()
    .gt('id', 0)
  if (error) {
    logger
      .withMetadata({
        function: 'deleteCabins',
        status,
        statusText,
        count,
      })
      .withError(error)
  } else {
    logger
      .withContext({ statusText, status, count })
      .info(`Deleted ${count} cabins`)
  }
}

async function deleteBookings() {
  logger.info('Deleting bookings...')
  const { error, count, statusText, status } = await supabase
    .from('bookings')
    .delete()
    .gt('id', 0)
  if (error) {
    logger
      .withMetadata({
        function: 'deleteBookings',
        status,
        statusText,
        count,
      })
      .withError(error)
  } else {
    logger.withContext({ statusText, status }).info(`Deleted ${count} bookings`)
  }
}

async function createGuests() {
  const { error, count, statusText, status } = await supabase
    .from('guests')
    .insert(guests)
  if (error) {
    logger
      .withMetadata({
        function: 'createGuests',
        status,
        statusText,
        count,
      })
      .withError(error)
  } else {
    logger
      .withContext({ statusText, status, count })
      .info(`Created ${count} guests`)
  }
}

async function createCabins() {
  const { error, status, count, statusText } = await supabase
    .from('cabins')
    .insert(cabins)
  if (error) {
    logger
      .withMetadata({
        function: 'createCabins',
        status,
        statusText,
        count,
      })
      .withError(error)
  } else {
    logger
      .withContext({ statusText, status, count })
      .info(`Created ${count} cabins`)
  }
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from('guests')
    .select('id')
    .order('id')
  const allGuestIds = guestsIds?.map(cabin => cabin.id)
  const { data: cabinsIds } = await supabase
    .from('cabins')
    .select('id')
    .order('id')
  const allCabinIds = cabinsIds?.map(cabin => cabin.id)

  const finalBookings = bookings.map(booking => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1)
    if (!cabin) {
      const error = new Error(
        `Cabin not found for booking with cabinId: ${booking.cabinId}`,
      )
      logger
        .withMetadata({
          function: 'finalBookings',
          booking,
        })
        .withError(error)
      throw error
    }
    const numNights = subtractDates(booking.endDate, booking.startDate)
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount)
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0 // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice

    let status
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = 'checked-out'
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = 'unconfirmed'
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-in'

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds?.at(booking.guestId - 1),
      cabinId: allCabinIds?.at(booking.cabinId - 1),
      status,
    }
  })

  const { error } = await supabase.from('bookings').insert(finalBookings)
  if (error) console.error(error.message)
}

const useDataReset = () => {
  const [isLoading, setIsLoading] = useState(false)

  async function uploadAll() {
    setIsLoading(true)
    // Bookings need to be deleted FIRST
    await deleteBookings()
    await deleteGuests()
    await deleteCabins()

    // Bookings need to be created LAST
    await createGuests()
    await createCabins()
    await createBookings()

    setIsLoading(false)
    window.location.reload()
  }

  async function uploadBookings() {
    setIsLoading(true)
    await deleteBookings()
    await createBookings()
    setIsLoading(false)
  }

  return { uploadAll, uploadBookings, isLoading }
}

export default useDataReset
