import type { NextFunction, Request, Response } from 'express';
import { ForbiddenException, UnauthorizedException } from '../exception/mainException.js';
import { SystemRoleEnum } from '../value/securityEnum.js';

export class RoleGuard {
  constructor(public role: SystemRoleEnum[]) { }

  access = () => {
    return (req: Request, _res: Response, next: NextFunction) => {
      if (!req.user) {
        return next(
          new UnauthorizedException('Authentication required', {
            messageCode: 109,
          })
        );
      }

      if (this.role.length && !this.role.includes(req.user.role)) {
        return next(
          new ForbiddenException('You do not have permission', {
            messageCode: 109,
          })
        );
      }

      return next();
    };
  }
}

