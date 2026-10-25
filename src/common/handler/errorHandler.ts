import type { ErrorRequestHandler } from 'express';
import { IError } from './interface/handlerType';

export const globalErrorHandling: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const normalizedError: IError = error instanceof Error ? error : new Error(String(error));
  const status = normalizedError.statusCode ?? normalizedError.status;

  const statusCode =
    typeof status === 'number' && Number.isInteger(status) && status >= 400 && status <= 599
      ? status
      : 500;

  return res.status(statusCode).json({
    errorMessage: normalizedError.message || 'server error',
    error: normalizedError,
    cause: normalizedError.cause,
    stack: normalizedError.stack,
  });
};
