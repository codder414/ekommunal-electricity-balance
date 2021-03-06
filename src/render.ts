import * as pug from 'pug';
import * as path from 'path';
import { config } from './config';

export async function render(data: string[][]): Promise<string> {
	const rendered = pug.renderFile(path.join(__dirname, '../layout/template.pug'), {
		header: data[0],
		rows: data.slice(1),
		baseUrl: config.BASE_URL
	});
	return rendered;
}
