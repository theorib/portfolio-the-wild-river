import { differenceInDays, formatDistance, parseISO } from 'date-fns'

type DateType = Date | string
type GetTodayOptions = {
  end?: boolean
}

export const subtractDates = (dateStr1: DateType, dateStr2: DateType): number =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)))

export const formatDistanceFromNow = (dateStr: string): string =>
  formatDistance(parseISO(dateStr), new Date(), {
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

export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
