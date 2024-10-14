import React, { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FilterOptionsProps } from "@/types/props/FilterOptions";
import { FilterNotice } from "./FilterNotice";
import { ScoreRangeFilter } from "./ScoreRangeFilter";
import { StartYearRangeFilter } from "./StartYearRangeFilter";
import { AnimeSpecificFilters } from "./AnimeSpecificFilters";
import { MangaSpecificFilters } from "./MangaSpecificFilters";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { IgnoreNAFilter } from "./IgnoreNAFilter";
import { Sliders, Tag, Calendar, SwatchBook, Users } from "lucide-react";

const genreOptions = [
	{ label: "Action", value: "action" },
	{ label: "Adventure", value: "adventure" },
	{ label: "Comedy", value: "comedy" },
	{ label: "Drama", value: "drama" },
	{ label: "Fantasy", value: "fantasy" },
	{ label: "Horror", value: "horror" },
	{ label: "Mystery", value: "mystery" },
	{ label: "Romance", value: "romance" },
	{ label: "Sci-Fi", value: "sci-fi" },
	{ label: "Slice of Life", value: "slice-of-life" },
	{ label: "Sports", value: "sports" },
	{ label: "Supernatural", value: "supernatural" },
];

const themeOptions = [
	{ label: "School", value: "school" },
	{ label: "Military", value: "military" },
	{ label: "Psychological", value: "psychological" },
	{ label: "Space", value: "space" },
	{ label: "Time Travel", value: "time-travel" },
	{ label: "Music", value: "music" },
	{ label: "Mecha", value: "mecha" },
	{ label: "Vampire", value: "vampire" },
];

const demographicOptions = [
	{ label: "Shounen", value: "shounen" },
	{ label: "Shoujo", value: "shoujo" },
	{ label: "Seinen", value: "seinen" },
	{ label: "Josei", value: "josei" },
];

export function FilterOptions({ isAnimeSearch, isDarkMode, onFilterChange }: FilterOptionsProps) {
	const [filters, setFilters] = useState({
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

	const handleFilterChange = (key: string, value: unknown) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const applyFilters = () => {
		onFilterChange(filters);
	};

	const getGradientClass = (isDarkMode: boolean) => {
		return isDarkMode
			? "bg-gradient-to-r from-purple-900 via-blue-900 to-teal-900 rounded-lg"
			: "bg-gradient-to-r from-purple-100 via-blue-100 to-teal-100 rounded-lg";
	};

	return (
		<Accordion type="single" collapsible className="w-full mb-4">
			<AccordionItem value="filters" className={getGradientClass(isDarkMode)}>
				<AccordionTrigger
					className={`${
						isDarkMode ? "text-white" : "text-black"
					} text-lg font-semibold p-4 rounded-t-lg`}
				>
					<Sliders className="w-5 h-5 mr-2" />
					Filter Options
				</AccordionTrigger>
				<AccordionContent className={`p-0`}>
					<Card className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-4 rounded-b-lg`}>
						<CardContent className="space-y-6">
							<FilterNotice isDarkMode={isDarkMode} />

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<h3
										className={`${
											isDarkMode ? "text-white" : "text-black"
										} text-lg font-semibold flex items-center`}
									>
										<Calendar className="w-5 h-5 mr-2 text-blue-500" />
										General Filters
									</h3>
									<ScoreRangeFilter
										filters={filters}
										handleFilterChange={handleFilterChange}
										isDarkMode={isDarkMode}
									/>
									<StartYearRangeFilter
										filters={filters}
										handleFilterChange={handleFilterChange}
										isDarkMode={isDarkMode}
									/>
									{isAnimeSearch ? (
										<AnimeSpecificFilters
											filters={filters}
											handleFilterChange={handleFilterChange}
											isDarkMode={isDarkMode}
										/>
									) : (
										<MangaSpecificFilters
											filters={filters}
											handleFilterChange={handleFilterChange}
											isDarkMode={isDarkMode}
										/>
									)}
								</div>

								<div className="space-y-4">
									<h3
										className={`${
											isDarkMode ? "text-white" : "text-black"
										} text-lg font-semibold flex items-center`}
									>
										<Tag className="w-5 h-5 mr-2 text-green-500" />
										Categories
									</h3>
									<MultiSelectFilter
										label="Genres"
										options={genreOptions}
										selected={filters.genres}
										handleFilterChange={handleFilterChange}
										isDarkMode={isDarkMode}
										icon={<Tag className="w-4 h-4 mr-2 text-green-500" />}
									/>
									<MultiSelectFilter
										label="Themes"
										options={themeOptions}
										selected={filters.themes}
										handleFilterChange={handleFilterChange}
										isDarkMode={isDarkMode}
										icon={
											<SwatchBook className="w-4 h-4 mr-2 text-purple-500" />
										}
									/>
									<MultiSelectFilter
										label="Demographics"
										options={demographicOptions}
										selected={filters.demographics}
										handleFilterChange={handleFilterChange}
										isDarkMode={isDarkMode}
										icon={<Users className="w-4 h-4 mr-2 text-blue-500" />}
									/>
								</div>
							</div>

							<div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
								<IgnoreNAFilter
									filters={filters}
									handleFilterChange={handleFilterChange}
									isDarkMode={isDarkMode}
								/>
								<Button
									onClick={applyFilters}
									className={`${
										isDarkMode
											? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
											: "bg-gradient-to-r from-blue-400 to-purple-400 hover:from-blue-500 hover:to-purple-500"
									} text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105`}
								>
									Apply Filters
								</Button>
							</div>
						</CardContent>
					</Card>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
