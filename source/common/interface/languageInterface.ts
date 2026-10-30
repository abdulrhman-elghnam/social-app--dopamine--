import { ApiLanguage } from '../value/systemEnum.js';

export interface ChooseLanguageOptions {
  language?: ApiLanguage | string;
  code?: number;
}

export type LanguageDictionary = Record<string, string>;
