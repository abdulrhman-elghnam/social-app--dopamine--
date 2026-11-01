import { SystemRoleEnum } from '../value/securityEnum.js';

declare global {
  namespace Express {
    interface Request {
      validated?: {
        body: unknown;
        params: unknown;
        query: unknown;
        file: unknown;
        files: unknown;
      };
      file?: unknown;
      files?: unknown;
      user?: {
        role: SystemRoleEnum;
      };
    }
  }
}

export {};
