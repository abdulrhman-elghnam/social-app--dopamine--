import { Router } from 'express';
import type { Router as RouterType } from 'express';
import { appService, utilService } from './DI/serviceDI.js';


export class AppController {
  public readonly appController: RouterType;
  private static instance: AppController;

  constructor(

  ) {
    this.appController = Router({
      caseSensitive: true,
      strict: true,
      mergeParams: true,
    });

    this.initializeRoutes();
  }

  static getInstance(

    ): AppController {
        if (!AppController.instance) {
            this.instance = new AppController(
            );
        }

        return AppController.instance;
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
