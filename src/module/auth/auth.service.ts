import { z } from 'zod';
import { AuthDTO } from './dto/authDto.js';
import { IHandlerResult } from '../../dependencies/service/util.service.js';

export class AuthService {
  constructor() { }
  signup = async (_payload: z.infer<
    ReturnType<AuthDTO['signupDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { status: 201, messageCode: 104 };
  };

  login = async (_payload: z.infer<
    ReturnType<AuthDTO['loginDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { messageCode: 309 };
  };

  googleCredential = async (_payload: z.infer<
    ReturnType<AuthDTO['googleSignUpDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { status: 201, messageCode: 104 };
  };

  requestForgetPassword = async (_payload: z.infer<
    ReturnType<AuthDTO['googleSignUpDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { status: 201, messageCode: 104 };
  };

  changePassword = async (_payload: z.infer<
    ReturnType<AuthDTO['googleSignUpDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { status: 201, messageCode: 104 };
  };

  verifyForgotPassword = async (_payload: z.infer<
    ReturnType<AuthDTO['googleSignUpDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { status: 201, messageCode: 104 };
  };

  verifyOtp = async (_payload: z.infer<
    ReturnType<AuthDTO['otpDTO']>['body']
  >): Promise<IHandlerResult> => {
    return { messageCode: 107 };
  };
}

export const authService = new AuthService();
