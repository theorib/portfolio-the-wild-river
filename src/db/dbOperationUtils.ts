import { type ErrorCatalog, errorCatalog } from '@/lib/constants/errorCatalog'
import {
  type MessageCatalog,
  type messageCatalog,
} from '@/lib/constants/messageCatalog'
import { AppError, type AppErrorInstance } from '@/lib/errors'
import { DrizzleError } from 'drizzle-orm'

export type DbOperationSuccessResult<T> = {
  data: T
  isSuccess: true
  message: (typeof messageCatalog)[MessageCatalog]['message']
}

export type DbOperationErrorResult = {
  error: AppErrorInstance
  isSuccess: false
  message: (typeof errorCatalog)[ErrorCatalog]['message']
}

export type DbOperationResult<T = unknown> =
  | DbOperationSuccessResult<T>
  | DbOperationErrorResult

export type DbOperationCallbackResult<T> = Promise<{
  data: T
  message: (typeof messageCatalog)[MessageCatalog]['message']
}>

export type DbOperationCallback<T, Args extends Array<unknown>> = (
  ...args: Args
) => DbOperationCallbackResult<T>

export type DbOperationFunction = <T, Args extends Array<unknown>>(
  operation: DbOperationCallback<T, Args>,
) => (...args: Args) => Promise<DbOperationResult<T>>

/**
 * Handles errors that occur during database operations.
 *
 * This function takes an unknown error object, converts it to an `AppError` instance if necessary, and returns a `DbOperationErrorResult` object with the appropriate error information.
 *
 * @param error - The error object to handle.
 * @returns A `DbOperationErrorResult` object containing the error information.
 */
function handleDbOperationError<T>(error: unknown): DbOperationErrorResult {
  let appError: AppErrorInstance
  if (error instanceof AppError) appError = error
  else if (error instanceof DrizzleError)
    appError = new AppError('DATABASE_DRIZZLE_ERROR', { cause: error })
  else appError = new AppError('UNKNOWN_ERROR', { cause: error })

  // TODO Log Error data
  return {
    error: appError,
    isSuccess: false,
    message: errorCatalog[appError.name].message,
  }
}

/**
 * Creates a database operation function that handles errors and returns a standardized result.
 *
 * This higher-order function takes a database operation callback and returns a new function that can be called with the same arguments as the original callback. The returned function will handle any errors that occur during the database operation and return a standardized `DbOperationResult` object.
 *
 * @param operation - The database operation callback to wrap.
 * @returns A new function that can be called with the same arguments as the original callback, and returns a `DbOperationResult` object.
 */
export const createDbOperation: DbOperationFunction =
  operation =>
  async (...args) => {
    try {
      const { data, message } = await operation(...args)
      return { data, isSuccess: true, message }
    } catch (error) {
      return handleDbOperationError(error)
    }
  }
