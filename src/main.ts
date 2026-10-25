import express from 'express';
import type { Application } from 'express';
import { AppController } from './appController';
import { AppService } from './appService';
import { globalErrorHandling } from './common/handler/errorHandler';

const app: Application = express();

const appAPI = new AppController(new AppService());

class Server {
  constructor() { }
  public run = () => {
    app.use(appAPI.appController);
    app.use(globalErrorHandling);
    app.listen(3000, () => {
      console.log('server is running in 3000');
    });
  }
}

const server = new Server()
server.run()