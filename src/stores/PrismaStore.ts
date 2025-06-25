import { AsyncSessionStore } from 'telegraf/session';
import prisma from '../lib/prisma';
import { JsonValue } from '../generated/prisma/runtime/library';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export class PrismaSessionStore implements AsyncSessionStore<JsonValue | undefined> {
	async get(key: string) {
		const session = await prisma.session.findUnique({
			where: { id: key },
		});
		return session?.data;
	}

	async set(key: string, value: any) {
		await prisma.session.upsert({
			where: { id: key },
			update: { data: value },
			create: {
				id: key,
				data: value,
			},
		});
	}

	async delete(key: string) {
		await prisma.session
			.delete({
				where: { id: key },
			})
			.catch(() => {});
	}
}
