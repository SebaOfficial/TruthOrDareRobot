import { Telegraf, Context as TelegrafContext } from 'telegraf';
import { SessionData } from './session';
import { Language, Locale } from '../i18n';
import { mode } from './mode';

export interface Context extends TelegrafContext {
	locale: Locale;
	session: {
		lang: Language;
		mode: mode;
	};
}

type HandlerContext<Method extends keyof InstanceType<typeof Telegraf<Context>>> = Parameters<
	Parameters<InstanceType<typeof Telegraf<Context>>[Method]>[1]
>[0];

export type CommandContext = HandlerContext<'command'>;
export type ActionContext = HandlerContext<'action'>;
