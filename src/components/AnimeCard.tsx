import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Anime {
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
}

interface AnimeCardProps {
	anime: Anime;
	isDarkMode: boolean;
}

export function AnimeCard({ anime, isDarkMode }: AnimeCardProps) {
	const titleRef = useRef<HTMLDivElement>(null);
	const [titleHeight, setTitleHeight] = useState(0);

	useEffect(() => {
		if (titleRef.current) {
			setTitleHeight(titleRef.current.clientHeight);
		}
	}, [anime.title, anime.title_english, anime.title_japanese]);

	const capitalizeTitle = (str: string) => {
		const exceptions = [
			"a",
			"an",
			"and",
			"as",
			"at",
			"but",
			"by",
			"for",
			"in",
			"nor",
			"of",
			"on",
			"or",
			"so",
			"the",
			"to",
			"up",
			"yet",
		];
		return str
			.split(" ")
			.map((word, index, arr) => {
				if (
					exceptions.includes(word.toLowerCase()) &&
					index !== 0 &&
					index !== arr.length - 1
				) {
					return word.toLowerCase();
				}
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			})
			.join(" ");
	};

	const parseStringArray = (input: string | string[]): string[] => {
		if (typeof input === "string") {
			if (input.startsWith("[") && input.endsWith("]")) {
				return input
					.slice(1, -1)
					.split(",")
					.map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
					.filter((item) => item !== "");
			} else {
				console.error("Input is not a valid array string:", input);
				return [];
			}
		} else if (Array.isArray(input)) {
			return input.filter((item) => item !== "");
		}
		return [];
	};

	const formatType = (type: string | undefined): string => {
		if (!type) return "N/A";
		const lowerType = type.toLowerCase();
		if (lowerType === "tv" || lowerType === "ova") {
			return lowerType.toUpperCase();
		} else if (lowerType === "movie" || lowerType === "special") {
			return lowerType.charAt(0).toUpperCase() + lowerType.slice(1);
		}
		return capitalizeTitle(type);
	};

	const synonyms = anime.title_synonyms ? parseStringArray(anime.title_synonyms) : [];
	const genres = parseStringArray(anime.genres);
	const themes = parseStringArray(anime.themes);
	const demographics = anime.demographics ? parseStringArray(anime.demographics) : [];

	const cardContent = (
		<Card
			className={`transition-transform transform ${anime.url ? "hover:scale-105" : ""} ${
				isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
			}`}
			style={{ height: "600px", overflow: "hidden", padding: "16px" }}
		>
			<CardHeader className="flex items-center justify-between p-4" ref={titleRef}>
				<div className="flex-grow text-center">
					<CardTitle className={isDarkMode ? "text-white" : "text-gray-900"}>
						{capitalizeTitle(anime.title)}
						{anime.title_english ? ` / ${capitalizeTitle(anime.title_english)}` : ""}
						{anime.title_japanese ? ` / ${anime.title_japanese}` : ""}
					</CardTitle>
				</div>
				<span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
					{(anime.similarity * 100).toFixed(2)}%
				</span>
			</CardHeader>
			<CardContent
				className="overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400"
				style={{ height: `calc(100% - ${titleHeight}px)`, padding: `2.5%` }}
			>
				{anime.main_picture ? (
					<Image
						src={anime.main_picture}
						alt={anime.title}
						layout="responsive"
						width={16}
						height={9}
						className="w-full h-40 object-cover mb-4 rounded"
					/>
				) : (
					<div className="w-full h-40 bg-gray-200 mb-4 rounded flex items-center justify-center">
						<span className="text-gray-500">No Image Available</span>
					</div>
				)}
				<div className="space-y-2">
					<p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
						{anime.synopsis || "N/A"}
					</p>
					<p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
						Score: {anime.score !== undefined ? anime.score : "N/A"}
					</p>
					<p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
						Episodes: {anime.episodes !== undefined ? anime.episodes : "N/A"}
					</p>
					<p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
						Type: {formatType(anime.type)}
					</p>
					<p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
						Genres: {genres.length > 0 ? genres.join(", ") : "N/A"}
					</p>
					<p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
						Themes: {themes.length > 0 ? themes.join(", ") : "N/A"}
					</p>
					<p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
						Demographics: {demographics.length > 0 ? demographics.join(", ") : "N/A"}
					</p>
					<p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
						Synonyms: {synonyms.length > 0 ? synonyms.join(", ") : "N/A"}
					</p>
				</div>
			</CardContent>
		</Card>
	);

	return anime.url ? (
		<a
			href={anime.url}
			target="_blank"
			rel="noopener noreferrer"
			className="block hover:no-underline"
		>
			{cardContent}
		</a>
	) : (
		cardContent
	);
}
