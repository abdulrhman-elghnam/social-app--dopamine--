import { Router } from 'express';
import type {
  Request,
  Response,
  NextFunction,
  Router as RouterType,
} from 'express';


import { validationPipe } from '../../DI/pipeDI.js';
import { authenticationService, utilService } from '../../DI/serviceDI.js';
import { authenticationDto } from '../../DI/dtoDI.js';

export class AuthenticationController {
  private static instance: AuthenticationController;

  public readonly authenticationController: RouterType;

  private constructor() {
    this.authenticationController = Router({
      caseSensitive: true,
      strict: true,
      mergeParams: true,
    });

    this.initializeRoutes();
  }

  static getInstance(

  ): AuthenticationController {
    if (!AuthenticationController.instance) {
      AuthenticationController.instance = new AuthenticationController(
      );
    }

    return AuthenticationController.instance;
  }

  private initializeRoutes(): void {
    this.authenticationController.post(
      '/signup',
      validationPipe.schema(authenticationDto.signupDto),
      utilService.responseFormatter({
        handler: (req: Request, res: Response, next: NextFunction) => {
          return authenticationService.signup(req.body);
        },
      }),
    );
  }
}