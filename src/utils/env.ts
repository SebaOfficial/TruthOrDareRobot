import { cleanEnv, str, port, url } from 'envalid';
import { configDotenv } from 'dotenv';

configDotenv();

const isBuild = process.env.NODE_ENV === "building"

const env = cleanEnv(process.env, {
	NODE_ENV: str({ choices: ['development', 'production', 'building'] }),

	DB_URL: url({ desc: 'The SQLite database path' }),
	LOG_PATH: str({ default: undefined, desc: 'Log path' }),
	PORT: port({ desc: 'Server port', devDefault: 0 }),

	BOT_TOKEN: isBuild ?
		str({ default: '', desc: 'Telegram Bot token, provided by @botfather (not required during build)' })
		: str({ desc: 'Telegram Bot token, provided by @botfather' }),

	WEBHOOK_DOMAIN: isBuild
		? str({ default: '', desc: 'Webhook endpoint (not required during build)' })
		: str({ desc: 'Webhook endpoint for telegram (required in production)' }),

});

export default env;
