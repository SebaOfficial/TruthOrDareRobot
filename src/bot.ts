import { Telegraf } from 'telegraf';
import { session } from 'telegraf/session';
import { Context } from './types/context';
import { AVAILABLE_LANGUAGES, FALLBACK_LANGUAGE, Language, locales } from './i18n';
import { PrismaSessionStore } from './stores/PrismaStore';
import env from './utils/env';
import { i18nMiddleware } from './middlewares/i18n';
import ModeHandler from './handlers/mode';
import StartHandler from './handlers/start';
import HelpHandler from './handlers/help';
import { TruthHandler, DareHandler } from './handlers/truth_or_dare';
import { AVAILABLE_MODES, FALLBACK_MODE } from './types/mode';
import LangHandler from './handlers/lang';
import PrivacyHandler from './handlers/privacy';

const bot = new Telegraf<Context>(env.BOT_TOKEN, { telegram: { webhookReply: true, apiMode: 'bot' } });

bot.use(
	session({
		defaultSession: (ctx) => {
			const langCode = (ctx.from?.language_code as Language) ?? FALLBACK_LANGUAGE;
			const lang = AVAILABLE_LANGUAGES.includes(langCode) ? langCode : FALLBACK_LANGUAGE;

			return {
				lang,
				mode: FALLBACK_MODE,
			};
		},
		store: new PrismaSessionStore(),
	}),
);

bot.use(i18nMiddleware);

bot.start(StartHandler.command);
bot.action('start', StartHandler.action);

bot.help(HelpHandler.command);
bot.action('help', HelpHandler.action);

bot.command('mode', ModeHandler.command);
AVAILABLE_MODES.forEach(mode => bot.action(`mode:${mode}`, ModeHandler.action));

bot.command('lang', LangHandler.command);
AVAILABLE_LANGUAGES.forEach((lang) => bot.action(`lang:${lang}`, LangHandler.action));

bot.command('privacy', PrivacyHandler.command);
bot.action('privacy', PrivacyHandler.action);

bot.command('truth', TruthHandler.command);
bot.action('truth', TruthHandler.action);

bot.command('dare', DareHandler.command);
bot.action('dare', DareHandler.action);

export default bot;
