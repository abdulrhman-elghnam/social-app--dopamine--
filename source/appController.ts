import { Router } from 'express';
import type { Router as RouterType } from 'express';
import { AppService } from './appService';

export class AppController {
  public readonly appController: RouterType;

  constructor(private readonly appService: AppService) {
    this.appController = Router({
      caseSensitive: true,
      strict: true,
      mergeParams: true,
    });

    this.appController.get('/', this.appService.mainService);
    this.appController.all('/{*splash}', this.appService.notFoundService);
  }
}
