import type { NextFunction, Request, Response } from 'express';
import { ForbiddenException, UnauthorizedException } from '../exception/main.exception.js';
import { SystemRoleEnum } from '../value/security.enum.js';

interface AuthorizationOptions {
  role?: readonly SystemRoleEnum[];
}

export const authorizationGuard = ({ role = [] }: AuthorizationOptions = {}) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(
        new UnauthorizedException('Authentication required', {
          messageCode: 109,
        })
      );
    }

    if (role.length && !role.includes(req.user.role)) {
      return next(
        new ForbiddenException('You do not have permission', {
          messageCode: 109,
        })
      );
    }

    return next();
  };
};
