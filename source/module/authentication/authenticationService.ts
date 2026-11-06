import { z } from 'zod';
import { AuthenticationDTO } from './authenticationDto.js';
import { IHandlerResult } from '../../common/service/utilService.js';

export class AuthenticationService {
  constructor() { }
  signup = async ({ }: z.infer<
    ReturnType<AuthenticationDTO['signupDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { status: 201, messageCode: 104 };
  };

  login = async ({ }: z.infer<
    ReturnType<AuthenticationDTO['loginDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { messageCode: 309 };
  };

  googleCredential = async ({ }: z.infer<
    ReturnType<AuthenticationDTO['googleSignUpDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { status: 201, messageCode: 104 };
  };

  requestForgetPassword = async ({ }: z.infer<
    ReturnType<AuthenticationDTO['googleSignUpDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { status: 201, messageCode: 104 };
  };

  changePassword = async ({ }: z.infer<
    ReturnType<AuthenticationDTO['googleSignUpDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { status: 201, messageCode: 104 };
  };

  verifyForgotPassword = async ({ }: z.infer<
    ReturnType<AuthenticationDTO['googleSignUpDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { status: 201, messageCode: 104 };
  };

  verifyOtp = async ({ }: z.infer<
    ReturnType<AuthenticationDTO['otpDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { messageCode: 107 };
  };
}

export const authenticationService = new AuthenticationService();
