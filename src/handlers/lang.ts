import BaseHandler from './base';
import { ActionContext, CommandContext } from '../types/context';
import { Keyboard, Key } from 'telegram-keyboard';
import isAdmin from '../utils/isAdmin';
import { AVAILABLE_LANGUAGES, Language, LANGUAGES_EMOJIS } from '../i18n';
import StartHandler from './start';
import { i18nMiddleware } from '../middlewares/i18n';

export default class LangHandler extends BaseHandler {
	private static changeLang(ctx: CommandContext | ActionContext, lang: Language) {
		ctx.session.lang = lang;
		i18nMiddleware(ctx, async () => {});
	}

	static async command(ctx: CommandContext) {
		if (!isAdmin(ctx)) {
			ctx.replyWithHTML(ctx.locale.error.NOT_ADMIN.message());
			return;
		}

		const lang = ctx.args[0] as Language | undefined;
		if (lang && AVAILABLE_LANGUAGES.includes(lang)) {
			await LangHandler.selected(ctx, lang);
			return;
		}

		await LangHandler.selector(ctx);
	}

	private static async setCommands(ctx: CommandContext | ActionContext) {
		await ctx.telegram.setMyCommands(
			Object.entries(ctx.locale.commands).map(([command, description]) => {
				return { command, description: description() };
			}),
			{ scope: { type: 'chat', chat_id: ctx.chat?.id ?? ctx.from.id } },
		);
	}

	private static async selector(ctx: CommandContext) {
		const locale = ctx.locale.lang.selector;
		const keyboard = Keyboard.make(
			AVAILABLE_LANGUAGES.map((lang) =>
				Key.callback(locale.keyboard[lang]({ lang_icon: LANGUAGES_EMOJIS[lang] }), `lang:${lang}`),
			),
		).inline();

		await ctx.replyWithHTML(locale.message(), keyboard);
	}

	private static async selected(ctx: CommandContext, lang: Language) {
		const locale = ctx.locale.lang.selected;
		LangHandler.changeLang(ctx, lang);
		await ctx.replyWithHTML(locale.message({ lang_icon: LANGUAGES_EMOJIS[lang] }));
		await LangHandler.setCommands(ctx);

		await StartHandler.command(ctx);
	}

	static async action(ctx: ActionContext) {
		const locale = ctx.locale.lang.selected;
		if (!isAdmin(ctx)) {
			ctx.answerCbQuery(ctx.locale.error.NOT_ADMIN.callback());
			return;
		}

		const lang = (ctx.update.callback_query as { data: string }).data.split(':')[1]! as Language;
		LangHandler.changeLang(ctx, lang);

		await ctx.editMessageText(locale.message({ lang_icon: LANGUAGES_EMOJIS[lang] }), { parse_mode: 'HTML' });
		await ctx.answerCbQuery(locale.callback({ lang_icon: LANGUAGES_EMOJIS[lang] }));
		await LangHandler.setCommands(ctx);

		await StartHandler.command(ctx as unknown as CommandContext);
	}
}
