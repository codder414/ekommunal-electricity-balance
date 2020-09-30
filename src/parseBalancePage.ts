import * as cheerio from 'cheerio';

export function parseBalancePage(page: string): string[][] {
	const $ = cheerio.load(page);

	const header: string[] = $('table')
		.find('tr')
		.first()
		.find('td')
		.map((_, e) => $(e).text().trim())
		.get();

	const rows = [];
	$('table')
		.find('tr')
		.slice(1)
		.each((_, el) => {
			const cols = $(el).children();
			rows.push(cols.map((_, el) => $(el).text().trim()).get());
		});
	return [header, ...rows];
}
