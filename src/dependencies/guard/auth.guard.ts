import { UnauthorizedException } from '../exception/main.exception.js';
import type { Request, Response, NextFunction } from 'express';
import { TokenTypeEnum } from '../value/securityEnum.js';
import { tokenService } from '../service/token.service.js';

class AuthGuard {
  constructor() {}
  check = (tokenType: TokenTypeEnum) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const authorization = req.headers.authorization;

      if (!authorization) {
        throw new UnauthorizedException('Authentication required', {
          messageCode: 109,
        });
      }

      const { user, payload } = await tokenService.decodeToken(authorization, tokenType);

      req.user = user;
      req.payload = payload;

      next();
    };
  };
}
export const authGuard = new AuthGuard();
