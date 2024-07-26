import { errorCatalog } from '@/lib/constants/errorCatalog';

type ErrorCode = keyof typeof errorCatalog;

// Extend the standard ErrorOptions
interface AppErrorOptions extends ErrorOptions {
  code?: string;
  data?: unknown;
}

class AppError extends Error {
  readonly name: string;
  readonly code?: string;
  readonly data?: unknown;

  constructor(errorType: ErrorCode, options?: AppErrorOptions) {
    const errorInfo = errorCatalog[errorType];
    super(errorInfo.message, options);

    this.name = errorInfo.name;
    if (options?.code) this.code = options.code;
    if (options?.data !== undefined) this.data = options.data;

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static create(errorType: ErrorCode, options?: AppErrorOptions): AppError {
    return new AppError(errorType, options);
  }
}

export default AppError;
