import express from 'express';
import type { Application } from 'express';
import { AppController } from './appController.js';
import { AppService } from './appService.js';
import { UtilService } from './common/service/utilService.js';


const app: Application = express();

app.use(express.json());

const appRoute = new AppController(await AppService.getInstance(),await UtilService.getInstance());

app.use(appRoute.appController);


class Server {
   constructor(
    private readonly utilService : UtilService
  ){}
  public run = () => {
    app.listen(3000, () => {
      app.use(this.utilService.globalErrorHandling);
      console.log('Server is running on port 3000');
    });
  };
}

const server = new Server(await UtilService.getInstance());
server.run();
