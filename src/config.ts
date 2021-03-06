import * as envalid from 'envalid';

const { str } = envalid;

export const config = envalid.cleanEnv(process.env, {
	ACCOUNT_ID: str(),
	URL: str(),
	REGION: str(),
	SUBREGION: str(),
	NODE_ENV: str({ default: 'development' }),
	LOG_LEVEL: str({ default: 'debug' }),
	BASE_URL: str({ default: '/' })
});
