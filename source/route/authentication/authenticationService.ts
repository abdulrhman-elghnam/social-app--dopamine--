import { z } from 'zod';
import { AuthenticationDTO } from './authenticationDto.js';
import { IHandlerResult } from '../../common/interface/responseInterface.js';

export class AuthenticationService {
  constructor() {}
  signup = async ({}: z.infer<
    ReturnType<AuthenticationDTO['signupDTO']>['body']
  >): Promise<IHandlerResult> => {
    return {};
  };
}

export const authenticationService = new AuthenticationService();
