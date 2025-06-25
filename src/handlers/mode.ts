import BaseHandler from './base';
import { ActionContext, CommandContext } from '../types/context';
import { AVAILABLE_MODES, MODES_EMOJIS, type mode as ModeType } from '../types/mode';
import { Keyboard, Key } from 'telegram-keyboard';
import isAdmin from '../utils/isAdmin';
import StartHandler from './start';

export default class ModeHandler extends BaseHandler {
	static async command(ctx: CommandContext) {
		if (!isAdmin(ctx)) {
			ctx.replyWithHTML(ctx.locale.error.NOT_ADMIN.message());
			return;
		}

		const mode = ctx.args[0] as ModeType | undefined;
		if (mode && AVAILABLE_MODES.includes(mode)) {
			await ModeHandler.selected(ctx, mode);
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
		await StartHandler.command(ctx);
	}

	static async action(ctx: ActionContext) {
		const locale = ctx.locale.mode.selected;
		if (!isAdmin(ctx)) {
			ctx.answerCbQuery(ctx.locale.error.NOT_ADMIN.callback());
			return;
		}

		const mode = (ctx.update.callback_query as { data: string }).data.split(':')[1]! as ModeType;
		ctx.session.mode = mode;

		await ctx.editMessageText(locale.message({ mode_icon: MODES_EMOJIS[mode] }), { parse_mode: 'HTML' });
		await ctx.answerCbQuery(locale.callback({ mode_icon: MODES_EMOJIS[mode] }));

		await StartHandler.command(ctx as unknown as CommandContext);
	}
}
