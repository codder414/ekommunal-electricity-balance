import { run } from './app';
import { render } from './render';
import { log } from './logger';
import { ServerResponse } from 'http';
import { Cache } from './Cache';
const cache = new Cache();

module.exports = async (_: Request, res: ServerResponse) => {
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
