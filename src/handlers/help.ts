import BaseHandler from './base';
import { ActionContext, CommandContext, Context } from '../types/context';
import { Keyboard, Key, CallbackButton } from 'telegram-keyboard';

export default class HelpHandler extends BaseHandler {
	private static getReply(ctx: Context, back_button: boolean = false) {
		const locale = ctx.locale.help;
		const message = locale.message();
		const keyboard = Keyboard.make(
			[
				back_button ? Key.callback(ctx.locale.common.back(), 'start') : undefined,
				Key.callback(locale.keyboard.privacy(), 'privacy'),
			].filter(Boolean) as CallbackButton[],
		).inline();

		return { locale, message, keyboard };
	}

	static async command(ctx: CommandContext) {
		const { message, keyboard } = HelpHandler.getReply(ctx);
		await ctx.replyWithHTML(message, keyboard);
	}

	static async action(ctx: ActionContext) {
		const { locale, message, keyboard } = HelpHandler.getReply(ctx, true);

		await ctx.editMessageText(message, { ...keyboard, parse_mode: 'HTML' });
		await ctx.answerCbQuery(locale.callback());
	}
}
