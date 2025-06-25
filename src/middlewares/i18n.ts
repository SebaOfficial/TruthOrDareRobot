import type { MiddlewareFn } from 'telegraf';
import type { Context } from '../types/context';
import { type Locale, locales } from '../i18n';

export const i18nMiddleware: MiddlewareFn<Context> = async (ctx, next) => {
	ctx.locale = locales[ctx.session.lang] as Locale;
	return next();
};
