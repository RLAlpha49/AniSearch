"use client";

import { useState, useEffect } from "react";
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
	const [searchQuery, setSearchQuery] = useState("");
	const [animeResults, setAnimeResults] = useState<Anime[]>([]);
	const [mangaResults, setMangaResults] = useState<Manga[]>([]);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [isAnimeSearch, setIsAnimeSearch] = useState(true);
	const [currentModel, setCurrentModel] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingMore, setIsLoadingMore] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(1);
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
			setError(`An error occurred while searching: ${error}`);
		} finally {
			if (isLoadMore) {
				setIsLoadingMore(false);
			} else {
				setIsLoading(false);
			}
		}
	};

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
					<ErrorDisplay error={error} />
					<ResultsList
						isAnimeSearch={isAnimeSearch}
						animeResults={animeResults}
						mangaResults={mangaResults}
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
