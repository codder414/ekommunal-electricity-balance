import { Entry } from './Entry';
import * as cheerio from 'cheerio';

export function parseRegions(pageData: string): Array<Entry> {
	const $ = cheerio.load(pageData, { decodeEntities: true });
	const rawRegions = $('.news_in.cabinet_in script').get()[0].children[0].data;
	const splittedData = rawRegions.split('\n');
	const collect: string[] = [];
	let startParsing = false;
	for (const line of splittedData) {
		if (line.trim().startsWith('var  regions = ')) {
			startParsing = true;
		}
		if (line.trim().startsWith('function setSubRegion(region) {')) {
			break;
		}
		if (startParsing) {
			collect.push(line);
		}
	}

	return JSON.parse(collect.join('').trim().slice(15, -1));
}
