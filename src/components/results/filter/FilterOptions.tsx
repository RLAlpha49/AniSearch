import React, { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FilterOptionsProps } from "@/types/props/FilterOptions";
import { FilterNotice } from "./FilterNotice";
import { ScoreRangeFilter } from "./ScoreRangeFilter";
import { StartYearRangeFilter } from "./StartYearRangeFilter";
import { AnimeSpecificFilters } from "./AnimeSpecificFilters";
import { MangaSpecificFilters } from "./MangaSpecificFilters";
import { MultiSelectFilter } from "./MultiSelectFilter";
import { IgnoreNAFilter } from "./IgnoreNAFilter";

const genreOptions = [
	{ label: "Action", value: "action" },
	{ label: "Adventure", value: "adventure" },
	{ label: "Award Winning", value: "award-winning" },
	{ label: "Avant Garde", value: "avant-garde" },
	{ label: "Boys Love", value: "boys-love" },
	{ label: "Comedy", value: "comedy" },
	{ label: "Drama", value: "drama" },
	{ label: "Ecchi", value: "ecchi" },
	{ label: "Erotica", value: "erotica" },
	{ label: "Fantasy", value: "fantasy" },
	{ label: "Girls Love", value: "girls-love" },
	{ label: "Gourmet", value: "gourmet" },
	{ label: "Hentai", value: "hentai" },
	{ label: "Horror", value: "horror" },
	{ label: "Mystery", value: "mystery" },
	{ label: "Romance", value: "romance" },
	{ label: "Sci-Fi", value: "sci-fi" },
	{ label: "Slice of Life", value: "slice-of-life" },
	{ label: "Sports", value: "sports" },
	{ label: "Supernatural", value: "supernatural" },
	{ label: "Suspense", value: "suspense" },
];

const themeOptions = [
	{ label: "Adult Cast", value: "adult-cast" },
	{ label: "Anthropomorphic", value: "anthropomorphic" },
	{ label: "CGDCT", value: "cgdct" },
	{ label: "Childcare", value: "childcare" },
	{ label: "Combat Sports", value: "combat-sports" },
	{ label: "Crossdressing", value: "crossdressing" },
	{ label: "Delinquents", value: "delinquents" },
	{ label: "Detective", value: "detective" },
	{ label: "Educational", value: "educational" },
	{ label: "Gag Humor", value: "gag-humor" },
	{ label: "Gore", value: "gore" },
	{ label: "Harem", value: "harem" },
	{ label: "High Stakes Game", value: "high-stakes-game" },
	{ label: "Historical", value: "historical" },
	{ label: "Isekai", value: "isekai" },
	{ label: "Iyashikei", value: "iyashikei" },
	{ label: "Love Polygon", value: "love-polygon" },
	{ label: "Magical Sex Shift", value: "magical-sex-shift" },
	{ label: "Mahou Shoujo", value: "mahou-shoujo" },
	{ label: "Martial Arts", value: "martial-arts" },
	{ label: "Mecha", value: "mecha" },
	{ label: "Medical", value: "medical" },
	{ label: "Military", value: "military" },
	{ label: "Music", value: "music" },
	{ label: "Mythology", value: "mythology" },
	{ label: "Organized Crime", value: "organized-crime" },
	{ label: "Otaku Culture", value: "otaku-culture" },
	{ label: "Parody", value: "parody" },
	{ label: "Performing Arts", value: "performing-arts" },
	{ label: "Pets", value: "pets" },
	{ label: "Psychological", value: "psychological" },
	{ label: "Racing", value: "racing" },
	{ label: "Reincarnation", value: "reincarnation" },
	{ label: "Reverse Harem", value: "reverse-harem" },
	{ label: "Romantic Subtext", value: "romantic-subtext" },
	{ label: "Samurai", value: "samurai" },
	{ label: "School", value: "school" },
	{ label: "Showbiz", value: "showbiz" },
	{ label: "Space", value: "space" },
	{ label: "Strategy Game", value: "strategy-game" },
	{ label: "Super Power", value: "super-power" },
	{ label: "Survival", value: "survival" },
	{ label: "Team Sports", value: "team-sports" },
	{ label: "Time Travel", value: "time-travel" },
	{ label: "Vampire", value: "vampire" },
	{ label: "Video Game", value: "video-game" },
	{ label: "Visual Arts", value: "visual-arts" },
	{ label: "Workplace", value: "workplace" },
];

const demographicOptions = [
	{ label: "Josei", value: "josei" },
	{ label: "Kids", value: "kids" },
	{ label: "Seinen", value: "seinen" },
	{ label: "Shoujo", value: "shoujo" },
	{ label: "Shounen", value: "shounen" },
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

	return (
		<Accordion type="single" collapsible className="w-full mb-4">
			<AccordionItem value="filters">
				<AccordionTrigger className={`${isDarkMode ? "text-white" : "text-black"}`}>
					Filter Options
				</AccordionTrigger>
				<AccordionContent>
					<div className="space-y-4">
						<FilterNotice isDarkMode={isDarkMode} />
						<ScoreRangeFilter
							filters={filters}
							handleFilterChange={handleFilterChange}
							isDarkMode={isDarkMode}
							label={""}
							options={[]}
							selected={[]}
						/>
						<StartYearRangeFilter
							filters={filters}
							handleFilterChange={handleFilterChange}
							isDarkMode={isDarkMode}
						/>
						{isAnimeSearch && (
							<AnimeSpecificFilters
								filters={filters}
								handleFilterChange={handleFilterChange}
								isDarkMode={isDarkMode}
							/>
						)}
						{!isAnimeSearch && (
							<MangaSpecificFilters
								filters={filters}
								handleFilterChange={handleFilterChange}
								isDarkMode={isDarkMode}
							/>
						)}
						<MultiSelectFilter
							label="Genres"
							options={genreOptions}
							selected={filters.genres}
							handleFilterChange={handleFilterChange}
							isDarkMode={isDarkMode}
						/>
						<MultiSelectFilter
							label="Themes"
							options={themeOptions}
							selected={filters.themes}
							handleFilterChange={handleFilterChange}
							isDarkMode={isDarkMode}
						/>
						<MultiSelectFilter
							label="Demographics"
							options={demographicOptions}
							selected={filters.demographics}
							handleFilterChange={handleFilterChange}
							isDarkMode={isDarkMode}
						/>
						<IgnoreNAFilter
							filters={filters}
							handleFilterChange={handleFilterChange}
							isDarkMode={isDarkMode}
						/>
						<Button
							onClick={applyFilters}
							className={`${
								isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
							}`}
						>
							Apply Filters
						</Button>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
