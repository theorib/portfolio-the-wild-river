export const errorCatalog = {
  AUTHENTICATION_ERROR: {
    name: 'AUTHENTICATION_ERROR',
    message: 'You must be logged in to view this content.',
  },
  INVALID_USER: {
    name: 'INVALID_USER',
    message: 'Invalid user details',
  },
  INVALID_EMAIL_ADDRESS: {
    name: 'INVALID_EMAIL_ADDRESS',
    message: 'The provided email is not a valid email address.',
  },
  USER_DATA_ERROR: {
    name: 'USER_DATA_ERROR',
    message: 'Error getting user data.',
  },
  EMAIL_IN_USE_ERROR: {
    name: 'EMAIL_IN_USE_ERROR',
    message: 'The provided email already exists, try logging in instead.',
  },
  UNKNOWN_ERROR: {
    name: 'UNKNOWN_ERROR',
    message: 'An unknown error occurred.',
  },
  UNKNOWN_DATABASE_ERROR: {
    name: 'UNKNOWN_DATABASE_ERROR',
    message: 'An unknown database error occurred.',
  },
  LOGIN_ERROR: {
    name: 'LOGIN_ERROR',
    message: 'Incorrect email or password.',
  },
  INVALID_SESSION: {
    name: 'INVALID_SESSION',
    message: 'Your session has expired or is invalid.',
  },
} as const;
