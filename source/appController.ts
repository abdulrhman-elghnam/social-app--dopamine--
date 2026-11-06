import { Router } from 'express';
import type { Router as RouterType } from 'express';
import { utilService } from './common/service/utilService.js';
import { appService } from './appService.js';

export class AppController {
  public readonly appController: RouterType;
  constructor() {
    this.appController = Router({
      caseSensitive: true,
      strict: true,
      mergeParams: true,
    });

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.appController.get(
      '/',
      utilService.responseFormatter({
        handler: () => ({
          messageCode: 101,
        }),
      })
    );

    this.appController.use((req, res, next) => {
      try {
        appService.notFoundService();
      } catch (error) {
        next(error);
      }
    });
  }
}

export const appController = new AppController();
