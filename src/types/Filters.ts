export interface Filters {
	scoreRange: number[] | [number, number];
	startYearRange: number[] | [number, number];
	genres: string[];
	themes: string[];
	demographics: string[];
	status: string[] | string;
	type: string[] | string;
	ignoreNA: boolean;
	startSeason: string[] | string;
	chaptersRange: number[] | [number, number];
	volumesRange: number[] | [number, number];
	episodesRange: number[][];
}
