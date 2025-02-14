import { type Paths } from '@/shared/constants/paths'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type NextRequest } from 'next/server'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export function getProtectedRoutes(paths: Paths): Array<string> {
  const protectedRoutes = Object.values(paths).reduce((acc, path) => {
    if (path.isProtectedRoute && typeof path.pathname === 'string')
      acc.push(path.pathname)
    if (path.isProtectedRoute && typeof path.pathname !== 'string')
      acc.push(path.pathname('*'))

    return acc
  }, [] as Array<string>)

  return protectedRoutes
}

export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/)

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase()
  }

  const firstInitial = words[0][0]
  const lastInitial = words[words.length - 1][0]

  return (firstInitial + lastInitial).toUpperCase()
}

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
}

export function isProtectedRoute(request: NextRequest, paths: Paths): boolean {
  return getProtectedRoutes(paths).some(
    route => route === request.nextUrl.pathname,
  )
}
