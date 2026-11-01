import { AuthenticationDTO } from '../route/authentication/authenticationDto.js';
import { languageService } from './serviceDI.js';

export const authenticationDto = AuthenticationDTO.getInstance(languageService);