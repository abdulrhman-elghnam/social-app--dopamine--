import { Router } from 'express';
import type { Request, Response, NextFunction, Router as RouterType } from 'express';
import { validationPipe } from '../../dependencies/pipe/validation.pipe.js';

import { utilService } from '../../dependencies/service/util.service.js';
import { authDTO } from './dto/authDto.js';
import { authService } from './auth.service.js';

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
      validationPipe.schema(authDTO.signupDTO),
      utilService.responseFormatter({
        handler: (req: Request, _res: Response, _next: NextFunction) => {
          return authService.signup(req.body);
        },
      })
    );

    this.authenticationController.post(
      '/login',
      validationPipe.schema(authDTO.loginDTO),
      utilService.responseFormatter({
        handler: (req: Request, _res: Response, _next: NextFunction) => {
          return authService.login(req.body);
        },
      })
    );

    this.authenticationController.post(
      '/google-signup',
      validationPipe.schema(authDTO.googleSignUpDTO),
      utilService.responseFormatter({
        handler: (req: Request, _res: Response, _next: NextFunction) => {
          return authService.googleCredential(req.body);
        },
      })
    );

    this.authenticationController.post(
      '/verify-otp',
      validationPipe.schema(authDTO.otpDTO),
      utilService.responseFormatter({
        handler: (req: Request, _res: Response, _next: NextFunction) => {
          return authService.verifyOtp(req.body);
        },
      })
    );
  }
}

export const authController = new AuthenticationController();
