import { Router } from 'express';
import type { Router as RouterType } from 'express';
import { utilService } from './dependencies/service/util.service.js';
import { appService } from './app.service.js';

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
        handler: async () => {
          return {
            messageCode: 101,
          };
        },
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
