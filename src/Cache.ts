function isPromise(value) {
	return Boolean(value && typeof value.then === 'function');
}

export class Cache {
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

	get<T>(key) {
		if (key in this.store) {
			return this.store[key] as T;
		}
		return null;
	}

	async getset<T>(key: string, data: () => T | T, ex: number): Promise<T> {
		const cached = this.get<T>(key);
		if (cached) {
			return cached;
		}
		let resultData: T;
		if (typeof data === 'function') {
			resultData = data();
			if (isPromise(resultData)) {
				resultData = await resultData;
			}
		} else {
			resultData = data;
		}
		this.set(key, resultData, ex);
		return resultData;
	}

	clear(): void {
		this.store = {};
		Object.keys(this.exs).forEach((key) => clearTimeout(this.exs[key]));
	}
}
