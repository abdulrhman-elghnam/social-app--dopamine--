import { SystemRoleEnum } from '../value/securityEnum.js';

declare global {
  namespace Express {
    interface Request {
      validated?: {
        body: unknown;
        params: unknown;
        query: unknown;
      };
      user?: {
        role: SystemRoleEnum;
      };
    }
  }
}

export {};
