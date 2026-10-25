import { Router } from 'express';
import type { Router as RouterType } from 'express';
import { mainService, notFoundService } from './appService';

export const appController: RouterType = Router({
  caseSensitive: true,
  strict: true,
  mergeParams: true,
});
appController.get('/', () => mainService());
appController.all('/{*splash}', () => notFoundService());
