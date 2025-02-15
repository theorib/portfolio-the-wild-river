import { type Paths } from '@/shared/constants/paths'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { type NextRequest } from 'next/server'

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

export const isSomeTrue = <TData>(values: Array<TData>): boolean => {
  return values.some(status => Boolean(status))
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

export const timestamps: { createdAt: true; updatedAt: true } = {
  createdAt: true,
  updatedAt: true,
}

export function isProtectedRoute(request: NextRequest, paths: Paths): boolean {
  return getProtectedRoutes(paths).some(
    route => route === request.nextUrl.pathname,
  )
}

type TryError = [data: undefined, error: Error]
type TrySuccess<TData> = [data: TData, error: undefined]
type TryResult<TData> = TrySuccess<TData> | TryError

export const trySync = <TData>(fn: () => TData): TryResult<TData> => {
  try {
    const result = fn()
    return [result, undefined]
  } catch (error) {
    const returnError =
      error instanceof Error
        ? error
        : new Error('Unknown Error', { cause: error })
    return [undefined, returnError]
  }
}

export const tryAsync = async <TData>(
  fn: () => Promise<TData>,
): Promise<TryResult<TData>> => {
  try {
    const result = await fn()
    return [result, undefined]
  } catch (error) {
    const returnError =
      error instanceof Error
        ? error
        : new Error('Unknown Error', { cause: error })
    return [undefined, returnError]
  }
}
