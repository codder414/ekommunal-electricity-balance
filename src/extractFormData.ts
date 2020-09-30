import { Entry } from './Entry';

export function extractFormData(
	data: Array<Entry>,
	city: string,
	distr: string
): { regionCode: string; districtCode: string } {
	const [region] = data.filter((entry) => entry.ShortName === city);
	const [district] = region.Children.Area.filter((entry) => entry.ShortName === distr);
	return { regionCode: region.Code, districtCode: district.Code } as const;
}
