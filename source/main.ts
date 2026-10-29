import express from 'express';
import type { Application } from 'express';
import { AppController } from './appController.js';
import { AppService } from './appService.js';
import { UtilService } from './common/service/utilService.js';
import { ConfigService } from './common/service/configService.js';


const app: Application = express();

app.use(express.json());

const appRoute = new AppController(await AppService.getInstance(),await UtilService.getInstance());

app.use(appRoute.appController);


class Server {
   constructor(
    private readonly utilService : UtilService,
    private readonly configService :ConfigService
  ){}
  public run = () => {
    const port = this.configService.get("PORT")
    app.listen(port, () => {
      app.use(this.utilService.globalErrorHandling);
      console.log(`Server is running on port ${port}`);
    });
  };
}

const server = new Server(await UtilService.getInstance() , ConfigService.getInstance());
server.run();
