import express from 'express';
import type { Application } from 'express';
import { appController } from './appController';
import { globalErrorHandling } from './common/handler/errorHandler';

const app: Application = express();

app.use(appController);
app.use(globalErrorHandling);

app.listen(3000, () => {
  console.log('server is running in 3000');
});
