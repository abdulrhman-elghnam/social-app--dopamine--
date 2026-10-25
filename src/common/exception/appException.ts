import type { IAppErrorOptions } from './interface/exceptionType';

export class AppError extends Error {
  readonly statusCode: number;
  readonly messageCode: number | undefined;
  readonly extra: unknown;
  readonly isOperational = true;

  constructor(
    { message = 'Internal server error', messageCode, extra }: IAppErrorOptions = {},
    statusCode = 500
  ) {
    super(message);

    this.name = new.target.name;
    this.statusCode = statusCode;
    this.messageCode = messageCode;
    this.extra = extra;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, new.target);
  }
}
