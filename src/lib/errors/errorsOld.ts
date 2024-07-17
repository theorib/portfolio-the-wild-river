// HTTP response status codes
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// const ErrorCatalog = {
//   AUTHENTICATION_ERROR: {
//     name: 'AUTHENTICATION_ERROR',
//     message: `You must be logged in to view this content`,
//   },
//   INVALID_USER: {
//     name: 'INVALID_USER',
//     message: `Invalid user details`,
//   },
// } as const;

// export const ErrorCatalog = {
//   AuthenticationError: {
//     code: 'E001',
//     errorName: 'AuthenticationError',
//     defaultMessage: `You must be logged in to view this content`,
//     description: '',
//   },
//   InvalidUser: {
//     code: 'E002',
//     errorName: 'InvalidUser',
//     defaultMessage: 'Invalid user',
//     description:
//       'The provided user credentials do not correspond to an existing user',
//     status: 400,
//   },
//   InvalidEmailAddress: {
//     code: 'E003',
//     errorName: 'InvalidEmailAddress',
//     defaultMessage: 'Invalid email address',
//     description: 'The provided email address is not a valid email address',
//     status: 400,
//   },
//   GetUserError: {
//     code: 'E004',
//     errorName: 'GetUserError',
//     defaultMessage: 'Unknown error getting user data',
//     description: '',
//   },
//   UnknownAuthError: {
//     code: 'E005',
//     errorName: 'UnknownAuthError',
//     defaultMessage: 'Unknown auth error',
//     description: '',
//   },
//   EmailInUseError: {
//     code: 'E006',
//     errorName: 'EmailInUseError',
//     defaultMessage: 'Email address already in use',
//     description: 'The provided email address is already in use by another user',
//   },
//   // Add more error definitions as needed
// } as const;

// type ErrorType = keyof typeof ErrorCatalog;

// type AppErrorOptions = {
//   customMessage?: string;
//   replaceMessage?: string;
//   replaceDescription?: string;
//   data?: unknown;
// };

// export class AppError extends Error {
//   public code: string;
//   public errorName: string;
//   public status?: number;
//   public customMessage?: string;
//   public description?: string;
//   public data?: unknown;

//   constructor(
//     public type: ErrorType,
//     options: AppErrorOptions = {},
//   ) {
//     const errorDef = ErrorCatalog[type];
//     super(options.replaceMessage || errorDef.defaultMessage);
//     this.name = this.constructor.name;
//     this.code = errorDef.code;
//     this.errorName = errorDef.errorName;
//     if ('status' in errorDef) {
//       this.status = errorDef.status;
//     }
//     this.customMessage = options.customMessage;
//     this.description = options.replaceDescription || errorDef.description;
//     this.data = options.data;
//     Error.captureStackTrace(this, this.constructor);
//   }

//   static create(type: ErrorType, options: AppErrorOptions = {}): AppError {
//     return new AppError(type, options);
//   }

//   get fullMessage(): string {
//     return this.customMessage
//       ? `${this.message} - ${this.customMessage}`
//       : this.message;
//   }
// }

// export function AppErrorObject(
//   type: ErrorType,
//   options: AppErrorOptions = {},
// ): {
//   code: string;
//   errorName: string;
//   status?: number;
//   message: string;
//   description?: string;
//   data?: unknown;
// } {
//   const errorDef = ErrorCatalog[type];
//   const message = options.replaceMessage || errorDef.defaultMessage;
//   const fullMessage = options.customMessage
//     ? `${message} - ${options.customMessage}`
//     : message;

//   return {
//     code: errorDef.code,
//     errorName: errorDef.errorName,
//     status: 'status' in errorDef ? errorDef.status : undefined,
//     message: fullMessage,
//     description: options.replaceDescription || errorDef.description,
//     data: options.data,
//   };
// }
