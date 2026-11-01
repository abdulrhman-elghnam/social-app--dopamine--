import { UnauthorizedException } from '../exception/mainException.js';
import type { Request, Response, NextFunction } from 'express';
import { TokenTypeEnum } from '../value/securityEnum.js';

class AuthenticationGuard {
  constructor() {}
  check = (tokenType: TokenTypeEnum) => {
    async (req: Request, res: Response, next: NextFunction) => {
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
}
export const authenticationGuard = new AuthenticationGuard();
