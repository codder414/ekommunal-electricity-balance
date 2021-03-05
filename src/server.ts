import { run } from './app';
import { render } from './render';

class Cache {
	private store: { [t: string]: unknown } = {};
	private exs: { [t: string]: NodeJS.Timeout } = {};

	set<T>(key, data: T, ex: number) {
		if (this.exs[key]) {
			clearTimeout(this.exs[key]);
		}
		this.store[key] = data;
		if (ex) {
			const timer = setTimeout(() => delete this.store[key], ex);
			this.exs[key] = timer;
		}
		return true;
	}

	get(key) {
		if (key in this.store) {
			return this.store[key];
		}
		return null;
	}

	getset<T>(key: string, data: T, ex: number): T {
		if (!this.get(key)) {
			this.set(key, data, ex);
		}
		return data as T;
	}
}

const cache = new Cache();

module.exports = async (_, res) => {
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
