import type { NextFunction, Request, Response } from 'express';

export interface IError extends Error {
  status?: unknown;
  statusCode?: unknown;
}

export interface IHandlerResult {
  status?: number;
  message?: string;
  data?: unknown;
  meta?: unknown;
}

export interface IHandlerFunction {
  handler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => IHandlerResult | void | Promise<IHandlerResult | void>;
}
