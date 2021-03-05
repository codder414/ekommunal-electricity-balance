import { run } from './app';
import { render } from './render';
import { log } from './logger';
import { promises as fs } from 'fs';
import { ServerResponse } from 'http';
import { join } from 'path';
import { Cache } from './Cache';
const cache = new Cache();

module.exports = async (req: Request, res: ServerResponse) => {
	log.info({ url: req.url });
	if (isStaticFile(req.url)) {
		try {
			const data = await openFile(req.url, cache);
			res.end(data);
			return;
		} catch (err) {
			res.statusCode = 404;
			res.end('Page not found!');
			return;
		}
	}
	const data = cache.get('page');
	if (data) {
		res.end(data);
	} else {
		const result = await run();
		const outputHtml = await render(result);
		cache.set('page', outputHtml, 60000);
		res.end(outputHtml);
	}
};

function isStaticFile(url: string) {
	return /\/tailwind\.css/i.test(url) || /\/favicon\.ico/i.test(url);
}

async function openFile(url: string, cache: Cache): Promise<Buffer> {
	return await cache.getset(url, async () => fs.readFile(join(__dirname, '../public', url)), 999999999999);
}

process.on('SIGINT', function () {
	log.info('ctrl+c');
	cache.clear();
	process.exit();
});
