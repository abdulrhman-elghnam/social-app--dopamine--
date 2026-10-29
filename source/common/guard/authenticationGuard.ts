// import { TokenTypeEnum, UnauthorizedException } from '#/common/_EXPORT.js';
// import { decodeToken } from '#/common/security/_INDEX.js';

import { UnauthorizedException } from '../exception/main.exception';
import type { Request, Response, NextFunction } from 'express';
import { TokenTypeEnum } from '../value/securityEnum';

export const authenticationGuard = ({ tokenType = TokenTypeEnum.ACCESS } = {}) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new UnauthorizedException("Authentication required",{
        messageCode : 109
      });
    }

    // const { user, payload } = await decodeToken({ authorization, tokenType });

    // req.user = user;
    // req.payload = payload;
    next();
  };
};
