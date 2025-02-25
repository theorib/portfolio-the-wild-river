import { differenceInDays, formatDistance, add } from 'date-fns'

type GetTodayOptions = {
  end?: boolean
}

export const subtractDates = (date1: Date, date2: Date): number =>
  differenceInDays(date1, date2)

export const formatDistanceFromNow = (date: Date): string =>
  formatDistance(date, new Date(), {
    addSuffix: true,
  })
    .replace('about ', '')
    .replace('in', 'In')

export const getToday = (options: GetTodayOptions = {}): string => {
  const today = new Date()

  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999)
  } else {
    today.setUTCHours(0, 0, 0, 0)
  }

  return today.toISOString()
}

export const fromToday = (numDays: number, withTime = false) => {
  const date = add(new Date(), { days: numDays })
  if (!withTime) date.setUTCHours(0, 0, 0, 0)
  return date.toISOString().slice(0, -1)
}

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
