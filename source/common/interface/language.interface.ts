import { ApiLanguage } from "../value/systemEnum";

export interface ChooseLanguageOptions {
  lang?: ApiLanguage | string;
  code?: number;
}
