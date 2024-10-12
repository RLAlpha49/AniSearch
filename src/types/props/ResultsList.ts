import { Anime } from "@/types/Anime";
import { Manga } from "@/types/Manga";

export interface ResultsListProps {
	isAnimeSearch: boolean;
	animeResults: Anime[];
	mangaResults: Manga[];
	isDarkMode: boolean;
}
