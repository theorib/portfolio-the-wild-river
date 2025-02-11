export const errorCatalog = {
  AUTHENTICATION_ERROR: {
    name: 'AUTHENTICATION_ERROR',
    message: 'You must be logged in to view this content.',
  },
  LOGIN_ERROR: {
    name: 'LOGIN_ERROR',
    message: 'Incorrect email or password.',
  },
  INVALID_SESSION: {
    name: 'INVALID_SESSION',
    message: 'Your session is invalid or has expired.',
  },
  INVALID_USER: {
    name: 'INVALID_USER',
    message: 'Invalid user details',
  },
  INVALID_EMAIL_ADDRESS: {
    name: 'INVALID_EMAIL_ADDRESS',
    message: 'The provided email is not a valid email address.',
  },
  EMAIL_IN_USE_ERROR: {
    name: 'EMAIL_IN_USE_ERROR',
    message: 'The provided email already exists, try logging in instead.',
  },
  DATABASE_RETURNED_DATA_INVALID: {
    name: 'DATABASE_RETURNED_DATA_INVALID',
    message: 'Invalid or unexpected data returned from database.',
  },
  DATABASE_SELECT_ERROR: {
    name: 'DATABASE_SELECT_ERROR',
    message: 'Error getting data from the database.',
  },
  DATABASE_INSERT_ERROR: {
    name: 'DATABASE_INSERT_ERROR',
    message: 'Error inserting data into the database.',
  },
  DATABASE_UPDATE_ERROR: {
    name: 'DATABASE_UPDATE_ERROR',
    message: 'Error updating data in the database.',
  },
  DATABASE_DELETE_ERROR: {
    name: 'DATABASE_DELETE_ERROR',
    message: 'Error deleting data from the database.',
  },
  DATABASE_UNKNOWN_ERROR: {
    name: 'DATABASE_UNKNOWN_ERROR',
    message: 'An unknown database error occurred.',
  },
  DATABASE_DRIZZLE_ERROR: {
    name: 'DATABASE_DRIZZLE_ERROR',
    message:
      'An error occurred when drizzle was interacting with the database.',
  },
  ZOD_PARSING_ERROR: {
    name: 'ZOD_PARSING_ERROR',
    message: 'Error parsing zod data.',
  },
  UNKNOWN_ERROR: {
    name: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred.',
  },

  RATE_LIMITER_ERROR: {
    name: 'RATE_LIMITER_ERROR',
    message: 'Error with the rate limiter api execution.',
  },
  RATE_LIMITER_OPTIONS_ERROR: {
    name: 'RATE_LIMITER_OPTIONS_ERROR',
    message: 'Invalid rate limiter options.',
  },

  RATE_LIMITER_IP_ERROR: {
    name: 'RATE_LIMITER_IP_ERROR',
    message: 'Make sure the ip address is passed in the request body',
  },
  TOO_MANY_REQUESTS: {
    name: 'TOO_MANY_REQUESTS',
    message: 'Too many requests.',
    code: 429,
  },
} as const satisfies Record<string, ErrorCatalogEntry<string>>

export type ErrorCatalog = keyof typeof errorCatalog
export type ErrorCatalogEntry<K extends string> = {
  name: K
  message: string
  code?: string | number
}
export type ErrorCatalogMessage = (typeof errorCatalog)[ErrorCatalog]['message']
export type ErrorCatalogName = ErrorCatalog
export type ErrorCatalogCode = string | number
