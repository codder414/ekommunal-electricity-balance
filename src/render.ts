import * as pug from 'pug';
import * as path from 'path';
import { promises } from 'fs';

export async function render(data: string[][]): Promise<void> {
	const rendered = pug.renderFile(path.join(__dirname, '../layout/template.pug'), {
		header: data[0],
		rows: data.slice(1)
	});
	promises.writeFile(path.join(__dirname, '../public/index.htm'), rendered);
}
