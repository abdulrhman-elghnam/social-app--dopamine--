import { z } from 'zod';

import { ApiLanguage } from '../../common/value/systemEnum.js';
import { languageService } from '../../common/service/languageService.js';
import { generalValidationFields } from '../../common/pipe/validationPipe.js';

export class AuthenticationDTO {
  constructor() {}

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
    };
  };
}

export const authenticationDTO = new AuthenticationDTO();
