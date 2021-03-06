import { run } from './app';
import { render } from './render';
import { log } from './logger';
import { ServerResponse } from 'http';
import { Cache } from './Cache';
import { config } from './config';
const cache = new Cache();

module.exports = async (req: Request, res: ServerResponse) => {
	if (req.url !== config.BASE_URL.replace(/\/$/, '')) {
		res.statusCode = 404;
		res.end('<h1>Page not found!</h1>');
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

process.on('SIGINT', function () {
	log.info('ctrl+c');
	cache.clear();
	process.exit();
});
