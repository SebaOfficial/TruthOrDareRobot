import BaseHandler from './base';
import { ActionContext, CommandContext } from '../types/context';
import { AVAILABLE_MODES, MODES_EMOJIS, type mode as ModeType } from '../types/mode';
import { Keyboard, Key } from 'telegram-keyboard';

export default class ModeHandler extends BaseHandler {
	private static async canChangeMode(ctx: CommandContext | ActionContext) {
		if (
			ctx.chat?.type !== 'private' &&
			!(await ctx.getChatAdministrators()).some((admin) => admin.user.id === ctx.from.id)
		) {
			return false;
		}

		return true;
	}

	static async command(ctx: CommandContext) {
		if (!(await ModeHandler.canChangeMode(ctx))) {
			ctx.replyWithHTML(ctx.locale.mode.error.message());
			return;
		}

		const mode = ctx.args[0];
		if (mode && AVAILABLE_MODES.includes(mode as ModeType)) {
			await ModeHandler.selected(ctx, mode as ModeType);
			return;
		}

		await ModeHandler.selector(ctx);
	}

	private static async selector(ctx: CommandContext) {
		const locale = ctx.locale.mode.selector;
		const keyboard = Keyboard.make([
			Key.callback(locale.keyboard.classic({ mode_icon_classic: MODES_EMOJIS.classic }), 'mode:classic'),
			Key.callback(locale.keyboard.hot({ mode_icon_hot: MODES_EMOJIS.hot }), 'mode:hot'),
		]).inline();

		await ctx.replyWithHTML(locale.message(), keyboard);
	}

	private static async selected(ctx: CommandContext, mode: ModeType) {
		const locale = ctx.locale.mode.selected;
		ctx.session.mode = mode;
		await ctx.replyWithHTML(locale.message({ mode_icon: MODES_EMOJIS[mode] }));
	}

	static async action(ctx: ActionContext) {
		const locale = ctx.locale.mode.selected;
		if (!(await ModeHandler.canChangeMode(ctx))) {
			ctx.answerCbQuery(ctx.locale.mode.error.callback());
			return;
		}

		const mode: ModeType = (ctx.update.callback_query as { data: string }).data.split(':')[1]! as ModeType;
		ctx.session.mode = mode;

		await ctx.editMessageText(locale.message({ mode_icon: MODES_EMOJIS[mode] }), { parse_mode: 'HTML' });
		await ctx.answerCbQuery(locale.callback({ mode_icon: MODES_EMOJIS[mode] }));
	}
}
