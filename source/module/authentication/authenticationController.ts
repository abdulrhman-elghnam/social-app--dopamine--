import { Router } from 'express';
import type { Request, Response, NextFunction, Router as RouterType } from 'express';
import { validationPipe } from '../../common/pipe/validationPipe.js';
import { authenticationDTO, authenticationService } from './_INDEX.js';
import { utilService } from '../../common/service/utilService.js';

export class AuthenticationController {
  public readonly authenticationController: RouterType;

  constructor() {
    this.authenticationController = Router({
      caseSensitive: true,
      strict: true,
      mergeParams: true,
    });

    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.authenticationController.post(
      '/signup',
      validationPipe.schema(authenticationDTO.signupDTO),
      utilService.responseFormatter({
        handler: (req: Request, res: Response, next: NextFunction) => {
          return authenticationService.signup(req.body);
        },
      })
    );

    this.authenticationController.post(
      '/login',
      validationPipe.schema(authenticationDTO.loginDTO),
      utilService.responseFormatter({
        handler: (req: Request, res: Response, next: NextFunction) => {
          return authenticationService.login(req.body);
        },
      })
    );

    this.authenticationController.post(
      '/google-signup',
      validationPipe.schema(authenticationDTO.googleSignUpDTO),
      utilService.responseFormatter({
        handler: (req: Request, res: Response, next: NextFunction) => {
          return authenticationService.googleCredential(req.body);
        },
      })
    );

    this.authenticationController.post(
      '/verify-otp',
      validationPipe.schema(authenticationDTO.otpDTO),
      utilService.responseFormatter({
        handler: (req: Request, res: Response, next: NextFunction) => {
          return authenticationService.verifyOtp(req.body);
        },
      })
    );
  }
}

export const authController = new AuthenticationController();
