import express from 'express';
import type { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { appController } from './appController.js';
import { authController } from './route/authentication/authenticationController.js';
import { configService } from './common/service/configService.js';
import { utilService } from './common/service/utilService.js';

const app: Application = express();

app.use(express.json());
app.use(helmet(), morgan('dev'));
app.use(appController.appController);
app.use('/authentication', authController.authenticationController);

class Server {
  constructor() {}
  public run = () => {
    const port = configService.get('PORT');
    app.listen(port, () => {
      app.use(utilService.globalErrorHandling);
      console.log(`Server is running on port ${port}`);
    });
  };
}

const server = new Server();
server.run();
