import { CommandContext, ActionContext } from '../types/context';

/**
 * Checks if a the chat is not private and user is an admin
 */
const isAdmin = async (ctx: CommandContext | ActionContext) =>
	ctx.chat?.type !== 'private' && !(await ctx.getChatAdministrators()).some((admin) => admin.user.id === ctx.from.id);

export default isAdmin;
