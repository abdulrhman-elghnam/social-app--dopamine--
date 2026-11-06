import express from 'express';
import type { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { appController } from './app.controller.js';


import { utilService } from './dependencies/service/util.service.js';
import { databaseService } from './dependencies/service/database.service.js';

import { configService } from './dependencies/service/config.service.js';
import { authController } from './module/auth/auth.controller.js';
import { cacheService } from './dependencies/service/cache.service.js';



const app: Application = express();

app.use(express.json());
app.use(helmet(), morgan('dev'));
app.use(appController.appController);
app.use('/authentication', authController.authenticationController);

class Server {
  constructor() { }
  public run = async () => {
    await Promise.all([
      databaseService.connect(),
      cacheService.connect(),
    ]);
    const port = configService.get('PORT');

    app.listen(port, () => {
      app.use(utilService.globalErrorHandling);
      console.log({ server: `running on http://localhost:${port}` });
    });
  };
}

const server = new Server();
server.run();
