import React from "react";
import { AnimeCard } from "@/components/results/AnimeCard";
import { MangaCard } from "@/components/results/MangaCard";
import { ResultsListProps } from "@/types/props/ResultsList";
import { Anime } from "@/types/Anime";
import { Manga } from "@/types/Manga";

function isAnime(item: Anime | Manga): item is Anime {
	return (item as Anime).anime_id !== undefined;
}

export function ResultsList({
	isAnimeSearch,
	animeResults,
	mangaResults,
	isDarkMode,
}: ResultsListProps) {
	const results = isAnimeSearch ? animeResults : mangaResults;

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
			{results.map((item) => (
				<div key={isAnime(item) ? item.anime_id : item.manga_id}>
					{isAnime(item) ? (
						<AnimeCard anime={item} isDarkMode={isDarkMode} />
					) : (
						<MangaCard manga={item} isDarkMode={isDarkMode} />
					)}
				</div>
			))}
		</div>
	);
}
