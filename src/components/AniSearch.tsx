"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "./layout/Header";
import { LoadMoreButton } from "./results/LoadMoreButton";
import { ModelSelector } from "./search/ModelSelector";
import { ResultsList } from "./results/ResultsList";
import { SearchTypeSwitch } from "./search/SearchTypeSwitch";
import { SearchInput } from "./search/SearchInput";
import { ErrorDisplay } from "./common/ErrorDisplay";
import { LoadingIndicator } from "./common/LoadingIndicator";
import { Anime } from "@/types/Anime";
import { Manga } from "@/types/Manga";
import { Settings } from "@/types/Settings";
import { Filters } from "@/types/Filters";
import { FilterOptions } from "./results/filter/FilterOptions";

const models = [
	"all-distilroberta-v1",
	"all-MiniLM-L6-v1",
	"all-MiniLM-L12-v1",
	"all-MiniLM-L6-v2",
	"all-MiniLM-L12-v2",
	"all-mpnet-base-v1",
	"all-mpnet-base-v2",
	"all-roberta-large-v1",
	"gtr-t5-base",
	"gtr-t5-large",
	"gtr-t5-xl",
	"multi-qa-distilbert-dot-v1",
	"multi-qa-mpnet-base-cos-v1",
	"multi-qa-mpnet-base-dot-v1",
	"paraphrase-distilroberta-base-v2",
	"paraphrase-mpnet-base-v2",
	"sentence-t5-base",
	"sentence-t5-large",
	"sentence-t5-xl",
];

export default function AniSearchComponent() {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [animeResults, setAnimeResults] = useState<Anime[]>([]);
	const [mangaResults, setMangaResults] = useState<Manga[]>([]);
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
	const [isAnimeSearch, setIsAnimeSearch] = useState<boolean>(true);
	const [currentModel, setCurrentModel] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
	const [filteredResults, setFilteredResults] = useState<Anime[] | Manga[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(1);
	const [settings, setSettings] = useState<Settings>(() => {
		if (typeof window !== "undefined") {
			const savedSettings = localStorage.getItem("aniSearchSettings");
			return savedSettings
				? JSON.parse(savedSettings)
				: {
						defaultModel: "sentence-t5-xl",
						pageTheme: "system",
						resultsPerPage: "6",
						customResultsPerPage: "",
						endpoint: "https://model.alpha49.com/anisearchmodel/",
				  };
		}
		return {
			defaultModel: "sentence-t5-xl",
			pageTheme: "system",
			resultsPerPage: "6",
			customResultsPerPage: "",
			endpoint: "https://model.alpha49.com/anisearchmodel/",
		};
	});
	const [currentFilters, setCurrentFilters] = useState<Filters>({
		scoreRange: [0, 10],
		startYearRange: [1917, 2025],
		genres: [] as string[],
		themes: [] as string[],
		demographics: [] as string[],
		status: [] as string[],
		type: [] as string[],
		episodesRange: [
			[0, 3057],
			[0, 110],
		],
		chaptersRange: [0, 6477],
		volumesRange: [0, 200],
		startSeason: [] as string[],
		ignoreNA: true,
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("aniSearchSettings", JSON.stringify(settings));
		}
	}, [settings]);

	useEffect(() => {
		setCurrentModel(settings.defaultModel);
	}, [settings.defaultModel]);

	useEffect(() => {
		const updateTheme = () => {
			let darkMode = false;
			if (settings.pageTheme === "system") {
				darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
			} else {
				darkMode = settings.pageTheme === "dark";
			}
			setIsDarkMode(darkMode);
		};

		updateTheme();

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", updateTheme);

		return () => {
			mediaQuery.removeEventListener("change", updateTheme);
		};
	}, [settings.pageTheme]);

	const toggleDarkMode = () => {
		const newDarkMode = !isDarkMode;
		setIsDarkMode(newDarkMode);
		setSettings((prev: Settings) => ({ ...prev, pageTheme: newDarkMode ? "dark" : "light" }));
	};

	const toggleSearchType = () => {
		setIsAnimeSearch(!isAnimeSearch);
	};

	const changeModel = (direction: "next" | "prev") => {
		const currentIndex = models.indexOf(currentModel);
		let newIndex;
		if (direction === "next") {
			newIndex = (currentIndex + 1) % models.length;
		} else {
			newIndex = (currentIndex - 1 + models.length) % models.length;
		}
		setCurrentModel(models[newIndex]);
	};

	const handleSearch = async () => {
		setPage(1);
		if (isAnimeSearch) {
			setAnimeResults([]);
		} else {
			setMangaResults([]);
		}
		await fetchResults(1);
	};

	const handleLoadMore = async () => {
		const nextPage = page + 1;
		setPage(nextPage);
		await fetchResults(nextPage, true);
	};

	const fetchResults = async (page: number, isLoadMore: boolean = false) => {
		try {
			if (isLoadMore) {
				setIsLoadingMore(true);
			} else {
				setIsLoading(true);
			}
			setError(null);
			const endpoint = isAnimeSearch ? "anime" : "manga";
			const response = await fetch(`${settings.endpoint}${endpoint}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model: `sentence-transformers/${currentModel}`,
					description: searchQuery,
					page,
					resultsPerPage:
						parseInt(settings.resultsPerPage) ||
						parseInt(settings.customResultsPerPage),
				}),
			});

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const text = await response.text();
			const sanitizedText = text.replace(/NaN/g, "null");

			if (isAnimeSearch) {
				const data: Anime[] = JSON.parse(sanitizedText);
				setAnimeResults((prevResults) => [...prevResults, ...data]);
			} else {
				const data: Manga[] = JSON.parse(sanitizedText);
				setMangaResults((prevResults) => [...prevResults, ...data]);
			}
		} catch (error) {
			console.error("Error fetching data:", error);

			if (settings.endpoint === "https://model.alpha49.com/anisearchmodel/") {
				setError(
					"Unable to access the default endpoint. You can run the models locally by following the instructions at https://github.com/RLAlpha49/AniSearchModel."
				);
			} else {
				setError(`An error occurred while searching: ${error}`);
			}
		} finally {
			if (isLoadMore) {
				setIsLoadingMore(false);
			} else {
				setIsLoading(false);
			}
		}
	};

	useEffect(() => {
		// Initialize filteredResults with all results initially
		setFilteredResults(isAnimeSearch ? animeResults : mangaResults);
	}, [animeResults, mangaResults, isAnimeSearch]);

	const handleFilterChange = useCallback(
		(filters: Filters) => {
			setCurrentFilters(filters);
			const results = isAnimeSearch ? animeResults : mangaResults;
			const filtered = results.filter((item: Anime | Manga) => {
				const score = item.score || 0;
				const startYear = isAnimeSearch
					? (item as Anime).start_year
					: (item as Manga).start_date
					? new Date((item as Manga).start_date!).getFullYear()
					: null;

				// Convert string representation of arrays to actual arrays
				const parseArray = (str: string | string[]) => {
					if (Array.isArray(str)) return str;
					try {
						return JSON.parse(str.replace(/'/g, '"'));
					} catch (e) {
						console.error("Failed to parse array:", str, e);
						return [];
					}
				};

				const itemGenres = item.genres ? parseArray(item.genres) : [];
				const itemThemes = item.themes ? parseArray(item.themes) : [];
				const itemDemographics = item.demographics ? parseArray(item.demographics) : [];

				// Check each filter condition, considering the ignoreNA option
				if (!filters.ignoreNA) {
					if (
						score === 0 ||
						score === null ||
						startYear === null ||
						itemGenres.length === 0 ||
						itemThemes.length === 0 ||
						itemDemographics.length === 0 ||
						(isAnimeSearch &&
							((item as Anime).episodes === 0 ||
								(item as Anime).episodes === null)) ||
						(!isAnimeSearch &&
							((item as Manga).chapters === 0 ||
								(item as Manga).chapters === null)) ||
						(!isAnimeSearch &&
							((item as Manga).volumes === 0 || (item as Manga).volumes === null))
					) {
						return false;
					}
				}

				if (score < filters.scoreRange[0] || score > filters.scoreRange[1]) return false;
				if (
					startYear &&
					(startYear < filters.startYearRange[0] || startYear > filters.startYearRange[1])
				)
					return false;

				// Case-insensitive comparison for genres, themes, and demographics
				if (
					filters.genres.length > 0 &&
					!filters.genres.some((genre: string) =>
						itemGenres.map((g: string) => g.toLowerCase()).includes(genre.toLowerCase())
					)
				) {
					return false;
				}

				if (
					filters.themes.length > 0 &&
					!filters.themes.some((theme: string) =>
						itemThemes.map((t: string) => t.toLowerCase()).includes(theme.toLowerCase())
					)
				) {
					return false;
				}

				if (
					filters.demographics.length > 0 &&
					!filters.demographics.some((demo: string) =>
						itemDemographics
							.map((d: string) => d.toLowerCase())
							.includes(demo.toLowerCase())
					)
				) {
					return false;
				}

				// Handle multiple selections for startSeason, status, and type
				if (
					Array.isArray(filters.startSeason) &&
					filters.startSeason.length > 0 &&
					!filters.startSeason.some(
						(season: string) =>
							(item as Anime).start_season?.toLowerCase() === season.toLowerCase()
					)
				) {
					return false;
				}

				if (
					Array.isArray(filters.status) &&
					filters.status.length > 0 &&
					!filters.status.some(
						(status: string) => item.status?.toLowerCase() === status.toLowerCase()
					)
				) {
					return false;
				}

				if (
					Array.isArray(filters.type) &&
					filters.type.length > 0 &&
					!filters.type.some(
						(type: string) => item.type?.toLowerCase() === type.toLowerCase()
					)
				) {
					return false;
				}

				// Check episodes range for Anime
				if (isAnimeSearch) {
					const episodes = (item as Anime).episodes || 0;
					const [minEpisodes, maxEpisodes] = filters.episodesRange[0];
					if (episodes < minEpisodes || episodes > maxEpisodes) {
						return false;
					}
				}

				// Check chapters and volumes range for Manga
				if (!isAnimeSearch) {
					const chapters = (item as Manga).chapters || 0;
					const volumes = (item as Manga).volumes || 0;
					const [minChapters, maxChapters] = filters.chaptersRange;
					const [minVolumes, maxVolumes] = filters.volumesRange;

					if (chapters < minChapters || chapters > maxChapters) {
						return false;
					}

					if (volumes < minVolumes || volumes > maxVolumes) {
						return false;
					}
				}

				return true;
			});

			setFilteredResults(filtered as Anime[] | Manga[]);
		},
		[animeResults, mangaResults, isAnimeSearch]
	);

	useEffect(() => {
		// Reapply filters whenever results change
		handleFilterChange(currentFilters);
	}, [animeResults, currentFilters, handleFilterChange, mangaResults]);

	return (
		<div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}>
			<div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
				<div className="container mx-auto p-4">
					<Header
						isDarkMode={isDarkMode}
						toggleDarkMode={toggleDarkMode}
						isAnimeSearch={isAnimeSearch}
						settings={settings}
						setSettings={setSettings}
						models={models}
					/>
					<SearchTypeSwitch
						isAnimeSearch={isAnimeSearch}
						toggleSearchType={toggleSearchType}
						isDarkMode={isDarkMode}
					/>
					<ModelSelector
						currentModel={currentModel}
						setCurrentModel={setCurrentModel}
						models={models}
						isDarkMode={isDarkMode}
						changeModel={changeModel}
						defaultModel={settings.defaultModel}
					/>
					<SearchInput
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						handleSearch={handleSearch}
						isLoading={isLoading}
						isLoadingMore={isLoadingMore}
						isDarkMode={isDarkMode}
						isAnimeSearch={isAnimeSearch}
					/>
					<FilterOptions
						isAnimeSearch={isAnimeSearch}
						isDarkMode={isDarkMode}
						onFilterChange={handleFilterChange}
					/>
					<ErrorDisplay error={error} />
					<ResultsList
						isAnimeSearch={isAnimeSearch}
						animeResults={filteredResults as Anime[]}
						mangaResults={filteredResults as Manga[]}
						isDarkMode={isDarkMode}
					/>
					<LoadingIndicator
						isLoading={isLoading}
						isLoadingMore={isLoadingMore}
						isDarkMode={isDarkMode}
						isAnimeSearch={isAnimeSearch}
					/>
					{(isAnimeSearch ? animeResults.length : mangaResults.length) > 0 &&
						!isLoading &&
						!isLoadingMore && (
							<LoadMoreButton isDarkMode={isDarkMode} onClick={handleLoadMore} />
						)}
				</div>
			</div>
		</div>
	);
}
