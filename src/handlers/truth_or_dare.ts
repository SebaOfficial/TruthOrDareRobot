import BaseHandler from './base';
import { ActionContext, CommandContext, Context } from '../types/context';
import { Keyboard, Key } from 'telegram-keyboard';
import Prompts from '../lib/prompts';
import { PromptType } from '../types/promptType';

const prompts = new Prompts();

class TruthOrDareHandler<T extends PromptType> {
	constructor(private readonly type: T) {}

	private getReply(ctx: Context, prompt: string) {
		const locale = ctx.locale[this.type];
		const message = locale.message({ prompt });
		const keyboard = Keyboard.make([Key.callback(locale.keyboard.another(), this.type)]).inline();

		return { locale, message, keyboard };
	}

	private randomPrompt(ctx: CommandContext | ActionContext): string {
		return prompts.getRandomPrompt(ctx.session.lang, this.type, ctx.session.mode, ctx.from.id.toString());
	}

	async command(ctx: CommandContext) {
		const prompt = this.randomPrompt(ctx);
		const { message, keyboard } = this.getReply(ctx, prompt);
		await ctx.replyWithHTML(message, keyboard);
	}

	async action(ctx: ActionContext) {
		const prompt = this.randomPrompt(ctx);
		const { locale, message, keyboard } = this.getReply(ctx, prompt);

		await ctx.editMessageText(message, { ...keyboard, parse_mode: 'HTML' });
		await ctx.answerCbQuery(locale.callback());
	}
}

export class TruthHandler extends BaseHandler {
	static async command(ctx: CommandContext) {
		new TruthOrDareHandler('truth').command(ctx);
	}

	static async action(ctx: ActionContext) {
		new TruthOrDareHandler('truth').action(ctx);
	}
}

export class DareHandler extends BaseHandler {
	static async command(ctx: CommandContext) {
		new TruthOrDareHandler('dare').command(ctx);
	}

	static async action(ctx: ActionContext) {
		new TruthOrDareHandler('dare').action(ctx);
	}
}
