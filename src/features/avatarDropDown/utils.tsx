import { trySync } from '@/shared/lib/utils'
import { z } from 'zod'

export const getInitials = (name: unknown) =>
  trySync(() => {
    const fullName = z.string().trim().parse(name)
    const words = fullName.split(/\s+/)
    const isOneWord = words.length === 1

    if (isOneWord) {
      const initials = words[0].slice(0, 2).toUpperCase()
      return initials
    }

    const firstInitial = words[0][0]
    const lastInitial = words[words.length - 1][0]
    const initials = (firstInitial + lastInitial).toUpperCase()

    return initials
  })

export const getFullName = (input: unknown, isLoading?: boolean) =>
  trySync(() => {
    if (isLoading) return 'loading...'
    const fullName = z.string().trim().parse(input)
    return fullName
  })

export const getFirstName = (input: unknown, isLoading?: boolean) =>
  trySync(() => {
    if (isLoading) return 'loading...'
    const firstName = z.string().trim().parse(input).split(' ')[0]
    return firstName
  })

export const getAvatarUrl = (input: unknown, isLoading?: boolean) =>
  trySync(() => {
    if (isLoading) return 'loading...'
    const avatarUrl = z.string().url().parse(input)
    return avatarUrl
  })

const UNKNOWN_USER = 'Unknown User'

export const getAvatarDropdownData = ({
  fullName,
  avatarUrl,
  isLoading,
}: {
  fullName: unknown
  avatarUrl: unknown
  isLoading: boolean
}) => {
  if (isLoading)
    return {
      initials: '...',
      firstName: 'loading...',
      avatarUrl: undefined,
    }

  const [parsedFullName] = getFullName(fullName)
  const [parsedInitials] = getInitials(fullName)
  const [parsedFirstName] = getFirstName(fullName)
  const [parsedAvatarUrl] = getAvatarUrl(avatarUrl)

  return {
    initials: parsedInitials ? parsedInitials : '?',
    fullName: parsedFullName ? parsedFullName : UNKNOWN_USER,
    firstName: parsedFirstName ? parsedFirstName : UNKNOWN_USER,
    avatarUrl: parsedAvatarUrl ? parsedAvatarUrl : undefined,
  }
}

// const { data: avatarUrl } = z
//   .string()
//   .url()
//   .safeParse(user?.user_metadata?.avatar)

// let initials, firstName: string
// if (isLoading) {
//   initials = '…'
//   firstName = 'loading…'
// }
// if (isLoggingOut) {
//   initials = fullName ? getInitials(fullName) : '…'
//   firstName = fullName ? fullName.split(' ').at(0) : '…'
// }
// initials = fullName ? getInitials(fullName) : '…'

// firstName = fullName ? fullName.split(' ').at(0) : '…'
