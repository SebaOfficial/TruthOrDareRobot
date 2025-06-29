import BaseHandler from './base';
import { ActionContext, CommandContext, Context } from '../types/context';
import { Keyboard, Key, CallbackButton } from 'telegram-keyboard';

export default class PrivacyHandler extends BaseHandler {
	private static getReply(ctx: Context, back_button: boolean = false) {
		const locale = ctx.locale.privacy;
		const message = locale.message();
		const keyboard = Keyboard.make(([
			back_button ? Key.callback(ctx.locale.common.back(), 'help') : undefined,
		].filter(Boolean) as CallbackButton[])).inline();

		return { locale, message, keyboard };
	}

	static async command(ctx: CommandContext) {
		const { message, keyboard } = PrivacyHandler.getReply(ctx);
		await ctx.replyWithHTML(message, keyboard);
	}

	static async action(ctx: ActionContext) {
		const { locale, message, keyboard } = PrivacyHandler.getReply(ctx, true);

		await ctx.editMessageText(message, { ...keyboard, parse_mode: 'HTML' });
		await ctx.answerCbQuery(locale.callback());
	}
}
