import { ApiLanguage } from '../common/value/systemEnum.js';
import * as ArabicMessages from './ar.json';
import * as EnglishMessages from './en.json';
import { ChooseLanguageOptions } from './interface/LanguageType.js';

export type LanguageMessages = Readonly<Record<string, string>>;



export const ArabicLanguage: LanguageMessages = ArabicMessages;
export const EnglishLanguage: LanguageMessages = EnglishMessages;

export const chooseLanguage = ({
  lang = ApiLanguage.ENGLISH,
  code,
}: ChooseLanguageOptions = {}): string => {
  const normalizedLanguage =
    String(lang).split(',')[0]?.split(';')[0]?.trim().split(/[-_]/)[0]?.toUpperCase() ?? '';
  let messages: LanguageMessages;

  switch (normalizedLanguage) {
    case ApiLanguage.ARABIC:
      messages = ArabicLanguage;
      break;
    case ApiLanguage.ENGLISH:
    default:
      messages = EnglishLanguage;
      break;
  }

  const messageKey = code === undefined ? undefined : String(code);

  return (
    (messageKey === undefined ? undefined : messages[messageKey]) ??
    (messageKey === undefined ? undefined : EnglishLanguage[messageKey]) ??
    EnglishLanguage['103'] ??
    'an error occurred'
  );
};
