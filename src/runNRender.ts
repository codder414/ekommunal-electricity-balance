import { run } from './app';
import { render } from './render';
import { promises } from 'fs';
import * as path from 'path';

run()
	.then((data) => render(data))
	.then((rendered) => {
		return promises.writeFile(path.join(__dirname, '../public/index.htm'), rendered);
	})
	.catch((err) => console.error(err));
