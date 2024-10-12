import React from "react";
import { AnimeCard } from "@/components/results/AnimeCard";
import { MangaCard } from "@/components/results/MangaCard";
import { ResultsListProps } from "@/types/props/ResultsList";

export function ResultsList({
	isAnimeSearch,
	animeResults,
	mangaResults,
	isDarkMode,
}: ResultsListProps) {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{isAnimeSearch
				? animeResults.map((anime) => (
						<AnimeCard key={anime.anime_id} anime={anime} isDarkMode={isDarkMode} />
				  ))
				: mangaResults.map((manga) => (
						<MangaCard key={manga.manga_id} manga={manga} isDarkMode={isDarkMode} />
				  ))}
		</div>
	);
}
