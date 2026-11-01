
import { z } from 'zod';

import { ApiLanguage } from '../../common/value/systemEnum.js';
import { LanguageService } from '../../common/service/languageService.js';
import { generalValidationFields } from '../../common/pipe/validationPipe.js';


export class AuthenticationDTO {
  private static instance: AuthenticationDTO;

  constructor(
    private readonly languageService: LanguageService,
  ) {}

  static getInstance(languageService: LanguageService): AuthenticationDTO {
    if (!AuthenticationDTO.instance) {
      AuthenticationDTO.instance = new AuthenticationDTO(languageService);
    }

    return AuthenticationDTO.instance;
  }

  signupDto  = (language: ApiLanguage) => {
    const t = (code: number) => this.languageService.chooseLanguage(language, code);
    
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
        .refine(
          (data) => data.password === data.confirmPassword,
          {
            path: ['confirmPassword'],
            message: t(250),
          },
        ),
    };
  };
}
