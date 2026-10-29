import { UnauthorizedException } from '../exception/main.exception.js';
import type { Request, Response, NextFunction } from 'express';
import { TokenTypeEnum } from '../value/securityEnum.js';

export const authenticationGuard = ({ tokenType = TokenTypeEnum.ACCESS } = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException('Authentication required', {
        messageCode: 109,
      });
    }

    // const { user, payload } = await decodeToken({ authorization, tokenType });

    // req.user = user;
    // req.payload = payload;
    next();
  };
};
