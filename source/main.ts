import express from 'express';
import type { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { appRoute, authenticationRoute } from './DI/controllerDI.js';
import { configService, utilService } from './DI/serviceDI.js';
import type { ConfigService } from './common/service/configService.js';
import type { UtilService } from './common/service/utilService.js';

const app: Application = express();

app.use(express.json());
app.use(helmet(), morgan('dev'));
app.use(appRoute.appController);
app.use('/authentication', authenticationRoute.authenticationController);

class Server {
  constructor(
    private readonly utilService: UtilService,
    private readonly configService: ConfigService
  ) {}
  public run = () => {
    const port = this.configService.get('PORT');
    app.listen(port, () => {
      app.use(this.utilService.globalErrorHandling);
      console.log(`Server is running on port ${port}`);
    });
  };
}

const server = new Server(
  utilService,
  configService,
);
server.run();
