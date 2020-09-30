import { log } from './logger';
import * as qs from 'querystring';
import axios from 'axios';
import { parseBalancePage } from './parseBalancePage';
import { extractFormData } from './extractFormData';
import { parseRegions } from './parseRegions';
import { config } from './config';
import { getCsrf } from './getCsrf';

export async function run(): Promise<string[][]> {
	const accountId = config.ACCOUNT_ID;

	log.info('Make request to get csrf token and regions data');
	const page = await axios.get(config.URL);

	const cookie = page.headers['set-cookie'];
	const parsedRegions = parseRegions(page.data);
	const formData = extractFormData(parsedRegions, config.REGION, config.SUBREGION);
	const csrfToken = getCsrf(page.data);

	const balanceRequestData = qs.stringify({
		'Balance[personal_account]': accountId,
		'Balance[service_id]': 3,
		'Balance[region_id]': parseInt(formData.regionCode),
		'Balance[sub_region_id]': parseInt(formData.districtCode),
		_csrf: csrfToken
	});

	const balanceInfo = await axios({
		method: 'POST',
		url: config.URL,
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			accept:
				'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'accept-language': 'en-US,en;q=0.9',
			'cache-control': 'no-cache',
			pragma: 'no-cache',
			'upgrade-insecure-requests': '1',
			'user-agent':
				'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36',
			cookie
		},
		data: balanceRequestData
	});

	return parseBalancePage(balanceInfo.data);
}

if (require.main === module) {
	run()
		.then((data) => console.log(data))
		.catch((err) => console.error(err));
}
