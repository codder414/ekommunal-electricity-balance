export type Entry = {
	Id: number;
	Code: string;
	Name: string;
	ShortName: string;
	Status: boolean;
	AreaName: { uz: string; ru: string; en: string };
	Children: {
		Title: string;
		Area: Array<Entry>;
	};
};
