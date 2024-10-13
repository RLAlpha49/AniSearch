export interface Anime {
    anime_id: number;
    title: string;
    title_english?: string;
    title_japanese?: string;
    title_synonyms?: string | string[];
    main_picture?: string;
    synopsis: string;
    score: number;
    episodes?: number;
    type?: string;
    genres: string | string[];
    themes: string | string[];
    demographics?: string | string[];
    similarity: number;
	url: string;
	start_year?: number;
	start_season?: string;
	status?: string;
}
