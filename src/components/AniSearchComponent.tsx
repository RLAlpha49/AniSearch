"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, Sun, ChevronLeft, ChevronRight, Loader2, Settings, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnimeCard } from "@/components/AnimeCard";
import { MangaCard } from "@/components/MangaCard";

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

interface Manga {
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
}

interface Settings {
	defaultModel: string;
	pageTheme: string;
	resultsPerPage: string;
	customResultsPerPage: string;
}

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
				  };
		}
		return {
			defaultModel: "sentence-t5-xl",
			pageTheme: "system",
			resultsPerPage: "6",
			customResultsPerPage: "",
		};
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("aniSearchSettings", JSON.stringify(settings));
		}
	}, [settings]);

	useEffect(() => {
		// Set the current model only once when the component mounts
		setCurrentModel(settings.defaultModel);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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

	const fetchResults = async (page: number, isLoadMore: boolean = false) => {
		try {
			if (isLoadMore) {
				setIsLoadingMore(true);
			} else {
				setIsLoading(true);
			}
			setError(null);
			const endpoint = isAnimeSearch ? "anime" : "manga";
			const response = await fetch(`http://localhost:5000/anisearchmodel/${endpoint}`, {
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

	return (
		<div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}>
			<div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
				<div className="container mx-auto p-4">
					<div className="flex justify-between items-center mb-8">
						<h1
							className={`text-3xl font-bold ${
								isDarkMode ? "text-white" : "text-gray-900"
							}`}
						>
							{isAnimeSearch ? "Anime" : "Manga"} Search
						</h1>
						<div className="flex items-center gap-2">
							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className={
											isDarkMode
												? "text-white hover:text-gray-300"
												: "text-gray-900 hover:text-gray-600"
										}
									>
										<Settings className="h-6 w-6" />
										<span className="sr-only">Settings</span>
									</Button>
								</DialogTrigger>
								<DialogContent
									className={
										isDarkMode
											? "bg-gray-800 text-white"
											: "bg-white text-gray-900"
									}
									style={{ maxWidth: "90%" }}
								>
									<DialogHeader>
										<DialogTitle>Settings</DialogTitle>
										<DialogDescription>
											Customize your search experience
										</DialogDescription>
									</DialogHeader>
									<div className="grid gap-4 py-4">
										<div className="flex items-center gap-4">
											<Label
												htmlFor="defaultModel"
												className="w-1/4 text-right"
											>
												Default Model
											</Label>
											<div className="flex-grow">
												<Select
													value={settings.defaultModel}
													onValueChange={(value) =>
														setSettings((prev) => ({
															...prev,
															defaultModel: value,
														}))
													}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select model" />
													</SelectTrigger>
													<SelectContent>
														{models.map((model) => (
															<SelectItem key={model} value={model}>
																{model === "sentence-t5-xl"
																	? `${model} (Default)`
																	: model}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</div>
										</div>
										<div className="flex items-center gap-4">
											<Label htmlFor="pageTheme" className="w-1/4 text-right">
												Page Theme
											</Label>
											<div className="flex-grow">
												<RadioGroup
													value={settings.pageTheme}
													onValueChange={(value) =>
														setSettings((prev) => ({
															...prev,
															pageTheme: value,
														}))
													}
													className="flex"
												>
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="light"
															id="light"
															className={
																settings.pageTheme === "light"
																	? "text-white"
																	: ""
															}
														/>
														<Label htmlFor="light">Light</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="dark"
															id="dark"
															className={
																settings.pageTheme === "dark" ||
																(settings.pageTheme === "system" &&
																	isDarkMode)
																	? "text-white"
																	: ""
															}
														/>
														<Label htmlFor="dark">Dark</Label>
													</div>
													<div className="flex items-center space-x-2">
														<RadioGroupItem
															value="system"
															id="system"
															className={
																settings.pageTheme === "system" &&
																isDarkMode
																	? "text-white"
																	: ""
															}
														/>
														<Label htmlFor="system">System</Label>
													</div>
												</RadioGroup>
											</div>
										</div>
										<div className="flex items-center gap-4">
											<Label
												htmlFor="resultsPerPage"
												className="w-1/4 text-right"
											>
												Results Per Page
											</Label>
											<div className="flex-grow">
												<Select
													value={settings.resultsPerPage}
													onValueChange={(value) => {
														if (value === "custom") {
															setSettings((prev) => ({
																...prev,
																resultsPerPage: "",
															}));
														} else {
															setSettings((prev) => ({
																...prev,
																resultsPerPage: value,
																customResultsPerPage: "",
															}));
														}
													}}
												>
													<SelectTrigger>
														<SelectValue placeholder="Select number" />
													</SelectTrigger>
													<SelectContent>
														{["3", "6", "9", "12", "custom"].map(
															(number) => (
																<SelectItem
																	key={number}
																	value={number}
																>
																	{number === "custom"
																		? "Custom"
																		: number}
																</SelectItem>
															)
														)}
													</SelectContent>
												</Select>
												{settings.resultsPerPage === "" && (
													<Input
														type="number"
														value={settings.customResultsPerPage || ""}
														onChange={(e) =>
															setSettings((prev) => ({
																...prev,
																customResultsPerPage:
																	e.target.value,
															}))
														}
														placeholder="Enter custom number"
														className="mt-2"
														min="1"
													/>
												)}
											</div>
										</div>
									</div>
								</DialogContent>
							</Dialog>
							<Button
								variant="ghost"
								size="icon"
								onClick={toggleDarkMode}
								className={
									isDarkMode
										? "text-white hover:text-gray-300"
										: "text-gray-900 hover:text-gray-600"
								}
							>
								{isDarkMode ? (
									<Sun className="h-6 w-6" />
								) : (
									<Moon className="h-6 w-6" />
								)}
							</Button>
						</div>
					</div>
					<div className="flex items-center gap-4 mb-4">
						<Switch
							id="search-type"
							checked={isAnimeSearch}
							onCheckedChange={toggleSearchType}
						/>
						<Label
							htmlFor="search-type"
							className={`text-sm font-medium ${
								isDarkMode ? "text-gray-300" : "text-gray-700"
							}`}
						>
							Search for: {isAnimeSearch ? "Anime" : "Manga"}
						</Label>
					</div>
					<div className="flex items-center gap-1.5 mb-4">
						<Button
							variant="outline"
							size="icon"
							onClick={() => changeModel("prev")}
							className={isDarkMode ? "text-white" : "text-gray-900"}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Select value={currentModel} onValueChange={setCurrentModel}>
							<SelectTrigger
								className={`w-[250px] ${
									isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
								}`}
							>
								<SelectValue placeholder="Select model" />
							</SelectTrigger>
							<SelectContent>
								{models.map((model) => (
									<SelectItem key={model} value={model}>
										{model === settings.defaultModel
											? `${model} (Default)`
											: model}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Button
							variant="outline"
							size="icon"
							onClick={() => changeModel("next")}
							className={isDarkMode ? "text-white" : "text-gray-900"}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
						<a
							href="https://sbert.net/docs/sentence_transformer/pretrained_models.html"
							target="_blank"
							rel="noopener noreferrer"
							className="ml-2 text-blue-500 hover:text-blue-700"
							title="More info about models used"
						>
							<Info className="h-5 w-5" />
						</a>
					</div>
					<div className="flex gap-4 mb-8">
						<Input
							type="text"
							placeholder={`Describe the ${
								isAnimeSearch ? "anime" : "manga"
							} you're looking for...`}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className={`flex-grow ${
								isDarkMode
									? "bg-gray-800 text-white placeholder-gray-400"
									: "bg-white text-gray-900"
							}`}
						/>
						<Button
							onClick={handleSearch}
							disabled={isLoading || isLoadingMore}
							className={`${
								isDarkMode
									? "bg-blue-600 hover:bg-blue-700"
									: "bg-blue-500 hover:bg-blue-600"
							} ${isLoading || isLoadingMore ? "opacity-50 cursor-not-allowed" : ""}`}
						>
							{isLoading || isLoadingMore ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									{isLoading
										? `Searching for ${isAnimeSearch ? "Anime" : "Manga"}...`
										: `Loading more ${isAnimeSearch ? "Anime" : "Manga"}...`}
								</>
							) : (
								`Find ${isAnimeSearch ? "Anime" : "Manga"}`
							)}
						</Button>
					</div>
					{error && (
						<div className={`text-center text-red-500 mb-4`}>
							<p>{error}</p>
						</div>
					)}
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{isAnimeSearch
							? animeResults.map((anime) => (
									<AnimeCard
										key={anime.anime_id}
										anime={anime}
										isDarkMode={isDarkMode}
									/>
							  ))
							: mangaResults.map((manga) => (
									<MangaCard
										key={manga.manga_id}
										manga={manga}
										isDarkMode={isDarkMode}
									/>
							  ))}
					</div>
					{(isLoading || isLoadingMore) && (
						<div
							className={`text-center ${
								isDarkMode ? "text-white" : "text-gray-900"
							} mt-4`}
						>
							<Loader2 className="h-8 w-8 animate-spin mx-auto" />
							<p className="mt-2">
								{isLoading
									? `Searching for ${isAnimeSearch ? "Anime" : "Manga"}...`
									: `Loading more ${isAnimeSearch ? "Anime" : "Manga"}...`}
							</p>
						</div>
					)}
					{(isAnimeSearch ? animeResults.length : mangaResults.length) > 0 &&
						!isLoading &&
						!isLoadingMore && (
							<div className="mt-8 text-center">
								<Button
									onClick={handleLoadMore}
									className={
										isDarkMode
											? "bg-blue-600 hover:bg-blue-700"
											: "bg-blue-500 hover:bg-blue-600"
									}
								>
									Load More
								</Button>
							</div>
						)}
				</div>
			</div>
		</div>
	);
}
