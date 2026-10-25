import type { ErrorRequestHandler } from 'express';

import type { IError } from './interface/handlerType';
import { chooseLanguage } from '../../core/language/_INDEX';


const statusMessageCodes: Record<number, number> = {
  400: 108,
  401: 109,
  403: 110,
  404: 111,
  405: 117,
  408: 118,
  409: 112,
  422: 113,
  429: 114,
  500: 115,
  503: 116,
};

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
  const messageCode =
    typeof normalizedError.messageCode === 'number' && Number.isInteger(normalizedError.messageCode)
      ? normalizedError.messageCode
      : (statusMessageCodes[statusCode] ?? 103);

  const language = req.get('accept-language');
  const languageOption = language === undefined ? {} : { lang: language };

  return res.status(statusCode).json({
    errorMessage: chooseLanguage({ ...languageOption, code: messageCode }),
    error: normalizedError,
    cause: normalizedError.cause,
    stack: normalizedError.stack,
  });
};
