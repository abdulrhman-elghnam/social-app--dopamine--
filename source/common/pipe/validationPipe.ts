import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

import { z } from 'zod';
import { ConflictException } from '../exception/mainException.js';

interface ValidationSchema {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
}

type SchemaFactory = (language: string) => ValidationSchema;

export const validationPipe = (schema: SchemaFactory): RequestHandler => {
  return (req, res, next) => {
    try {
      const language = req.get('accept-language') ?? 'en';

      const validationSchema = schema(language);

      const result = z
        .object({
          body: validationSchema.body ?? z.object({}),
          params: validationSchema.params ?? z.object({}),
          query: validationSchema.query ?? z.object({}),
        })
        .safeParse({
          body: req.body,
          params: req.params,
          query: req.query,
        });

      if (!result.success) {
        return next(
          new ConflictException('Validation failed', {
            messageCode: 201,
            extra: result.error.issues.map(({ path, code, message }) => ({
              path,
              code,
              message,
            })),
          })
        );
      }

      req.body = result.data.body;

      req.validated = {
        body: result.data.body,
        params: result.data.params,
        query: result.data.query,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};
