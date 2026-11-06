import { z } from 'zod';

import { ApiLanguage } from '../../common/value/systemEnum.js';
import { languageService } from '../../common/service/languageService.js';
import { generalValidationFields } from '../../common/pipe/validationPipe.js';

export class AuthenticationDTO {
  constructor() {}

  loginDTO = (language: ApiLanguage) => {
    const t = (code: number) => languageService.chooseLanguage(language, code);

    return {
      body: z.object({
        email: generalValidationFields.email(t),
        password: generalValidationFields.password(t),
      }),
      params: z.object({}),
      query: z.object({}),
    };
  };

  otpDTO = (language: ApiLanguage) => {
    const t = (code: number) => languageService.chooseLanguage(language, code);

    return {
      body: z.object({
        email: generalValidationFields.email(t),
        otp: generalValidationFields.otp(t),
      }),
      params: z.object({}),
      query: z.object({}),
    };
  };

  googleSignUpDTO = (language: ApiLanguage) => {
    const t = (code: number) => languageService.chooseLanguage(language, code);

    return {
      body: z.object({
        idToken: generalValidationFields.idToken(t),
      }),
      params: z.object({}),
      query: z.object({}),
    };
  };

  signupDTO = (language: ApiLanguage) => {
    const t = (code: number) => languageService.chooseLanguage(language, code);

    return {
      body: z
        .object({
          email: generalValidationFields.email(t),
          username: generalValidationFields.username(t),
          password: generalValidationFields.password(t),
          confirmPassword: generalValidationFields.confirmPassword(t),
          fullName: generalValidationFields.fullName(t),
          gender: generalValidationFields.gender(t),
          phoneNumber: generalValidationFields.phoneNumber(t),
          DOB: generalValidationFields.DOB(t),
        })
        .refine((data) => data.password === data.confirmPassword, {
          path: ['confirmPassword'],
          message: t(250),
        }),
      params: z.object({}),
      query: z.object({}),
    };
  };
}

export const authenticationDTO = new AuthenticationDTO();
