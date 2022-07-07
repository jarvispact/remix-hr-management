import { de } from '~/i18n/locales/de';
import { en } from '~/i18n/locales/en';
import type { SupportedLanguage, TranslationKey } from './i18n';

const translationsMap = {
    en,
    de,
};

export const getTranslations = (supportedLanguage: SupportedLanguage) =>
    translationsMap[supportedLanguage];

export type Translations = { [TK in TranslationKey]: string };
