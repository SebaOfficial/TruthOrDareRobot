import { ActionContext, CommandContext, Context } from '../types/context';
import { Keyboard, Key } from 'telegram-keyboard';
import BaseHandler from './base';

export default class StartHandler extends BaseHandler {
	private static getReply(ctx: Context, name: string) {
		const locale = ctx.locale.start;
		const message = locale.message({ name: name });
		const keyboard = Keyboard.make([
			[Key.url(locale.keyboard.developer(), 'https://racca.me/'), Key.callback(locale.keyboard.help(), 'help')],
			[Key.url(locale.keyboard.add_to_group(), `https://t.me/${ctx.botInfo.username}?startgroup`)],
		]).inline();

		return { locale, message, keyboard };
	}

	static async command(ctx: CommandContext) {
		const { message, keyboard } = StartHandler.getReply(ctx, ctx.from.first_name);

		await ctx.replyWithHTML(message, keyboard);
	}

	static async action(ctx: ActionContext) {
		const { locale, message, keyboard } = StartHandler.getReply(ctx, ctx.from.first_name);

		await ctx.editMessageText(message, { ...keyboard, parse_mode: 'HTML' });
		await ctx.answerCbQuery(locale.callback());
	}
}
