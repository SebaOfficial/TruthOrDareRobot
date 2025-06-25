import en from '../generated/i18n/en';
import it from '../generated/i18n/it';

export const locales = { en, it };

export type Language = keyof typeof locales;
export type Locale = typeof en;

export const AVAILABLE_LANGUAGES: Language[] = Object.keys(locales) as Language[];
export const FALLBACK_LANGUAGE: Language = 'en';

export const LANGUAGES_EMOJIS: Record<Language, string> = {
	en: '🇬🇧',
	it: '🇮🇹',
};
