import { ApiLanguage } from '../value/system.enum.js';

export interface ChooseLanguageOptions {
  language?: ApiLanguage | string;
  code?: number;
}

export type LanguageDictionary = Record<string, string>;
