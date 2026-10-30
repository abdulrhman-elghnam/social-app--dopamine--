import fs from 'node:fs/promises';
import type { LanguageDictionary } from '../interface/languageInterface.js';
import { ApiLanguage } from '../value/systemEnum.js';

export class LanguageService {
  private static instancePromise: Promise<LanguageService> | undefined;

  private arabicLanguage!: LanguageDictionary;
  private englishLanguage!: LanguageDictionary;

  private constructor() {}

  static getInstance(): Promise<LanguageService> {
    if (!LanguageService.instancePromise) {
      LanguageService.instancePromise = LanguageService.createInstance();
    }

    return LanguageService.instancePromise;
  }

  private static async createInstance(): Promise<LanguageService> {
    const instance = new LanguageService();

    const getLanguage = (language: string) =>
      new URL(`../../i18n/${language}.json`, import.meta.url);

    const [arabic, english] = await Promise.all([
      fs.readFile(getLanguage('ar'), 'utf-8'),
      fs.readFile(getLanguage('en'), 'utf-8'),
    ]);

    instance.arabicLanguage = JSON.parse(arabic);
    instance.englishLanguage = JSON.parse(english);

    return instance;
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
