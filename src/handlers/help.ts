import BaseHandler from './base';
import { ActionContext, CommandContext, Context } from '../types/context';
import { Keyboard, Key } from 'telegram-keyboard';

export default class HelpHandler extends BaseHandler {
	private static getReply(ctx: Context) {
		const locale = ctx.locale.help;
		const message = locale.message();

		return { locale, message };
	}

	static async command(ctx: CommandContext) {
		const { message } = HelpHandler.getReply(ctx);
		await ctx.replyWithHTML(message);
	}

	static async action(ctx: ActionContext) {
		const { locale, message } = HelpHandler.getReply(ctx);
		const keyboard = Keyboard.make([Key.callback(locale.keyboard.back(), 'start')]).inline();

		await ctx.editMessageText(message, { ...keyboard, parse_mode: 'HTML' });
		await ctx.answerCbQuery(locale.callback());
	}
}
