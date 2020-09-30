import * as pino from 'pino';

let packageJson: { name: string; version: string } = Object.create(null);

try {
	// tslint:disable-next-line: no-var-requires
	packageJson = require('../package.json');
} catch (err) {
	packageJson = { name: 'DefaultApp', version: '0.0.0' };
}

export function create({ name = packageJson.name }: { name?: string }): pino.Logger {
	const logLevel = process.env.NODE_ENV === 'production' ? 'info' : 'debug';
	return pino({
		name,
		level: logLevel,
		prettyPrint: logLevel === 'debug'
	});
}

export const log = create({});
