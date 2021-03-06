import { run } from './app';
import { render } from './render';
import { log } from './logger';
import { Cache } from './Cache';
import { config } from './config';
import * as Express from 'express';
import * as path from 'path';

const cache = new Cache();

const app = Express();
const router = Express.Router();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../layout'));

if (config.NODE_ENV === 'development') {
	router.use(Express.static(path.join(__dirname, '../', './public')));
}

router.get('/', async (_, res) => {
	const data = cache.get('page');
	if (data) {
		res.end(data);
	} else {
		const result = await run();
		const outputHtml = await render(result);
		cache.set('page', outputHtml, 60000);
		res.end(outputHtml);
	}
});

router.use(function (req, res) {
	res.status(404);

	// respond with html page
	if (req.accepts('html')) {
		res.render('404', { url: req.url });
		return;
	}

	// respond with json
	if (req.accepts('json')) {
		res.send({ error: 'Not found' });
		return;
	}

	// default to plain-text. send()
	res.type('txt').send('Not found');
});

app.use(config.BASE_URL, router);
app.listen(3000, '0.0.0.0', () => log.info('Server listening on 0.0.0.0:3000...'));

process.on('SIGINT', function () {
	log.info('ctrl+c');
	cache.clear();
	process.exit();
});
