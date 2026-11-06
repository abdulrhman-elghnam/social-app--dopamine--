import express from 'express';
import type { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { appController } from './app.controller.js';


import { utilService } from './dependencies/service/util.service.js';
import { databaseService } from './dependencies/service/database.service.js';

import { configService } from './dependencies/service/config.service.js';
import { authController } from './module/auth/auth.controller.js';



const app: Application = express();

app.use(express.json());
app.use(helmet(), morgan('dev'));
app.use(appController.appController);
app.use('/authentication', authController.authenticationController);

class Server {
  constructor() {}
  public run = async () => {
    await databaseService.connect();
    const port = configService.get('PORT');

    app.listen(port, () => {
      app.use(utilService.globalErrorHandling);
      console.log(`Server is running on port ${port}`);
    });
  };
}

const server = new Server();
server.run();
