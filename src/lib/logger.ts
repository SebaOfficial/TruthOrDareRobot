import { appendFile } from 'fs';
import { Logger as TsLog } from 'tslog';

const instances: Record<string, Logger> = {};

export class Logger extends TsLog<unknown> {
	private constructor(
		name: string,
		private readonly path?: string,
	) {
		super({
			type: 'pretty',
			hideLogPositionForProduction: true,
			name,
		});

		if (path) {
			this.attachTransport((logObj) => {
				appendFile(path, JSON.stringify(logObj) + '\n', (err) => {
					if (err) throw err;
				});
			});
		}
	}

	static make(name: string, path?: string) {
		if (!instances[name]) {
			instances[name] = new this(name, path);
		}

		return instances[name];
	}
}
