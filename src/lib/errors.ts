// HTTP response status codes
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

export const ErrorCatalog = {
  invalidSession: {
    code: 'E001',
    description: '',
    defaultMessage: `This is not a valid email address.`,
  },
  invalidUser: {
    code: 'E002',
    defaultMessage: 'Invalid user',
    description:
      'The provided user credentials do not correspond to an existing user',
    status: 400,
  },
  invalidEmailAddress: {
    code: 'E003',
    defaultMessage: 'Invalid email address',
    description: 'The provided email address is not a valid email address',
    status: 400,
  },
  getUserError: {
    code: 'E004',
    defaultMessage: 'Unknown error getting user data',
    description: '',
  },
  unknownAuthError: {
    code: 'E005',
    defaultMessage: 'Unknown auth error',
    description: '',
  },

  // Add more error definitions as needed
} as const;

type ErrorType = keyof typeof ErrorCatalog;

type AppErrorOptions = {
  customMessage?: string;
  replaceMessage?: string;
  replaceDescription?: string;
  data?: unknown;
};

export class AppError extends Error {
  public code: string;
  public status?: number;
  public customMessage?: string;
  public description?: string;
  public data?: unknown;

  constructor(
    public type: ErrorType,
    options: AppErrorOptions = {},
  ) {
    const errorDef = ErrorCatalog[type];
    super(options.replaceMessage || errorDef.defaultMessage);
    this.name = this.constructor.name;
    this.code = errorDef.code;
    if ('status' in errorDef) {
      this.status = errorDef.status;
    }
    this.customMessage = options.customMessage;
    this.description = options.replaceDescription || errorDef.description;
    this.data = options.data;
    Error.captureStackTrace(this, this.constructor);
  }

  static create(type: ErrorType, options: AppErrorOptions = {}): AppError {
    return new AppError(type, options);
  }

  get fullMessage(): string {
    return this.customMessage
      ? `${this.message} - ${this.customMessage}`
      : this.message;
  }
}

export function AppErrorObject(
  type: ErrorType,
  options: AppErrorOptions = {},
): {
  code: string;
  status?: number;
  message: string;
  description?: string;
  data?: unknown;
} {
  const errorDef = ErrorCatalog[type];
  const message = options.replaceMessage || errorDef.defaultMessage;
  const fullMessage = options.customMessage
    ? `${message} - ${options.customMessage}`
    : message;

  return {
    code: errorDef.code,
    status: 'status' in errorDef ? errorDef.status : undefined,
    message: fullMessage,
    description: options.replaceDescription || errorDef.description,
    data: options.data,
  };
}
