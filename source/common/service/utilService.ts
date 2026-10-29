import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';

import type { IHandlerFunction } from '../interface/response.interface.js';
import type { IError } from '../interface/error.interface.js';

import { LanguageService } from './languageService.js';

export class UtilService {
  private static instancePromise: Promise<UtilService> | undefined;

  private constructor(
    private readonly languageService: LanguageService,
  ) {}

  static getInstance(): Promise<UtilService> {
    if (!UtilService.instancePromise) {
      UtilService.instancePromise = UtilService.createInstance();
    }

    return UtilService.instancePromise;
  }

  private static async createInstance(): Promise<UtilService> {
    const languageService = await LanguageService.getInstance();

    return new UtilService(languageService);
  }

  public responseFormatter = ({ handler }: IHandlerFunction) => {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      try {
        const result = await handler(req, res, next);

        if (res.headersSent) return;

        const language = req.get('accept-language');

        const message = this.languageService.chooseLanguage(
          language,
          result?.messageCode ?? 107,
        );

        res.status(result?.status ?? 200).json({
          message: result?.message ?? message,
          data: result?.data,
          meta: result?.meta,
        });
      } catch (error) {
        next(error);
      }
    };
  };

  public globalErrorHandling: ErrorRequestHandler = (
    error,
    req,
    res,
    next,
  ) => {
    if (res.headersSent) {
      return next(error);
    }

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

    const normalizedError: IError = (
      error instanceof Error ? error : new Error(String(error))
    ) as IError;

    const status = normalizedError.statusCode ?? normalizedError.status;

    const statusCode =
      typeof status === 'number' &&
      Number.isInteger(status) &&
      status >= 400 &&
      status <= 599
        ? status
        : 500;

    const messageCode =
      typeof normalizedError.messageCode === 'number' &&
      Number.isInteger(normalizedError.messageCode)
        ? normalizedError.messageCode
        : (statusMessageCodes[statusCode] ?? 103);

    const language = req.get('accept-language');

    const errorMessage = this.languageService.chooseLanguage(
      language,
      messageCode,
    );

    return res.status(statusCode).json({
      errorMessage,
      error: normalizedError.message,
      cause: normalizedError.cause,
      stack: normalizedError.stack,
    });
  };
}