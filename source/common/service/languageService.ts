import fs from 'node:fs/promises';
import { ApiLanguage } from '../value/systemEnum.js';

export interface ChooseLanguageOptions {
  language?: ApiLanguage | string;
  code?: number;
}

export type LanguageDictionary = Record<string, string>;

export class LanguageService {
  private arabicLanguage!: LanguageDictionary;
  private englishLanguage!: LanguageDictionary;

  constructor() {}

  public async loadLanguages(): Promise<void> {
    const getLanguage = (language: string) =>
      new URL(`../../i18n/${language}.json`, import.meta.url);
    const [arabic, english] = await Promise.all([
      fs.readFile(getLanguage('ar'), 'utf-8'),
      fs.readFile(getLanguage('en'), 'utf-8'),
    ]);

    this.arabicLanguage = JSON.parse(arabic);
    this.englishLanguage = JSON.parse(english);
  }

  chooseLanguage = (
    language: ApiLanguage | string = ApiLanguage.ENGLISH,
    code: number = 103
  ): string => {
    const normalizedLanguage = (language.split(',')[0] ?? '').split(';')[0]?.trim().toLowerCase();

    const messages = normalizedLanguage?.startsWith('ar')
      ? this.arabicLanguage
      : this.englishLanguage;

    const messageKey = String(code);

    return (
      messages[messageKey] ??
      this.englishLanguage[messageKey] ??
      this.englishLanguage['103'] ??
      'An error occurred'
    );
  };
}

export const languageService = await (async () => {
  const service = new LanguageService();
  await service.loadLanguages();
  return service;
})();
