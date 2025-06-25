import crypto from 'crypto';
import env from './utils/env';
import bot from './bot';
import { Logger } from './lib/logger';

const logger = Logger.make('app', env.LOG_PATH);

if (env.isProduction) {
	logger.info(`Starting bot in webhook mode at 0.0.0.0:${env.PORT} (${process.env.WEBHOOK_DOMAIN})`);
	bot.launch({
		webhook: {
			domain: env.WEBHOOK_DOMAIN,
			port: env.PORT,
			path: '/bot',
			secretToken: crypto.randomBytes(64).toString('hex'),
		},
	});
} else {
	logger.info('Starting bot in polling mode');
	bot.launch();
}
