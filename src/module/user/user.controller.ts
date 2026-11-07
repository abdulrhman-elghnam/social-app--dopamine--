import { Router } from 'express';
import type { Request, Response, NextFunction, Router as RouterType } from 'express';
import { limiterGuard } from '../../dep/guard/limiter.guard.js';


class UserController {
  public readonly route: RouterType;

  constructor() {
    this.route = Router({
      caseSensitive: true,
      strict: true,
      mergeParams: true,
    });

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.route.get(
      '/profile',
      limiterGuard.generateLimiter({
        ttl: 15 * 60 * 1000,
        limit: 100,
        message: 'Too many requests from this IP, please try again after 15 minutes',
      }),
      (req: Request, res: Response, next: NextFunction) => {
        next();
      }
    );
  }
}

export const userController = new UserController();
