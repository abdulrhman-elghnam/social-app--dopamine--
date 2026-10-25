import type { NextFunction, Request, Response } from 'express';
import { ForbiddenException, UnauthorizedException } from '../exception/main.exception';
import { SystemRoleEnum } from '../value/securityEnum';

declare global {
  namespace Express {
    interface Request {
      user?: {
        role: SystemRoleEnum;
      };
    }
  }
}

interface AuthorizationOptions {
  role?: readonly SystemRoleEnum[];
}

export const authorizationGuard = ({ role = [] }: AuthorizationOptions = {}) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedException({ messageCode: 109 });
    }

    if (role.length && !role.includes(req.user.role)) {
      throw new ForbiddenException({ messageCode: 109 });
    }

    return next();
  };
};
