export interface Manga {
	manga_id: number;
	title: string;
	title_english?: string;
	title_japanese?: string;
	title_synonyms?: string | string[];
	main_picture?: string;
	synopsis: string;
	score: number;
	chapters?: number;
	volumes?: number;
	type?: string;
	status?: string;
	genres: string | string[];
	themes: string | string[];
	demographics?: string | string[];
	similarity: number;
	url: string;
	start_date?: string;
}
