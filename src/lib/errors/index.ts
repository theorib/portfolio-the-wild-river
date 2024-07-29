import { type ErrorCatalog, errorCatalog } from '@/lib/constants/errorCatalog';

// Extend the standard ErrorOptions
interface AppErrorOptions extends ErrorOptions {
  code?: string;
}

export class AppError extends Error {
  readonly name: ErrorCatalog;
  readonly code?: string;

  constructor(errorType: ErrorCatalog, options?: AppErrorOptions) {
    const errorInfo = errorCatalog[errorType];
    super(errorInfo.message, options);

    this.name = errorType;
    if (options?.code) this.code = options.code;

    Object.setPrototypeOf(this, new.target.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static create(errorType: ErrorCatalog, options?: AppErrorOptions): AppError {
    return new AppError(errorType, options);
  }
}

export type AppErrorInstance = AppError;
