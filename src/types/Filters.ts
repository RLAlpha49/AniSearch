export interface Filters {
	scoreRange: number[] | [number, number];
	startYearRange: number[] | [number, number];
	genres: string[];
	themes: string[];
	demographics: string[];
	status?: string;
	type?: string;
	ignoreNA: boolean;
}
