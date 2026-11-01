import { AppController } from '../appController.js';
import { AuthenticationController } from '../route/authentication/authenticationController.js';

export const appRoute = AppController.getInstance();
export const authenticationRoute = AuthenticationController.getInstance();