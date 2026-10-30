import { Router } from 'express';
import type { Router as RouterType } from 'express';
import { AppService } from './app.service.js';
import { UtilService } from './common/service/util.service.js';

export class AppController {
  public readonly appController: RouterType;

  constructor(
    private readonly appService: AppService,
    private readonly utilService: UtilService
  ) {
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
      this.utilService.responseFormatter({
        handler: () => ({
          messageCode: 101,
        }),
      })
    );

    this.appController.use((req, res, next) => {
      try {
        this.appService.notFoundService();
      } catch (error) {
        next(error);
      }
    });
  }
}
