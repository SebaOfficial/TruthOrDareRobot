import { ActionContext, CommandContext } from '../types/context';

export default abstract class BaseHandler {
	static async command(ctx: CommandContext) {}
	static async action(ctx: ActionContext) {}
}
