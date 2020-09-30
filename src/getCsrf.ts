import * as cheerio from 'cheerio';

export function getCsrf(pageData: string): string {
	const $ = cheerio.load(pageData, { decodeEntities: true });
	return $('form input[name=_csrf]').attr('value').trim();
}
