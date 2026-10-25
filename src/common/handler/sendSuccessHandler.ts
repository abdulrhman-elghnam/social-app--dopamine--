import type { NextFunction, Request, Response } from 'express';
import type { IHandlerFunction } from './interface/handlerType';
import { chooseLanguage } from '../../core/language/_INDEX';


export const ResponseFormatter = ({ handler }: IHandlerFunction) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await handler(req, res, next);

    if (res.headersSent) return;

    const language = req.get('accept-language');
    const languageOption = language === undefined ? {} : { lang: language };
    const message =
      result?.messageCode === undefined
        ? (result?.message ?? chooseLanguage({ ...languageOption, code: 107 }))
        : chooseLanguage({
            ...languageOption,
            code: result.messageCode,
          });

    return res.status(result?.status ?? 200).json({
      message,
      data: result?.data,
      meta: result?.meta,
    });
  };
};
