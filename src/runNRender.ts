import { run } from './app';
import { render } from './render';

run()
	.then((data) => render(data))
	.catch((err) => console.error(err));
