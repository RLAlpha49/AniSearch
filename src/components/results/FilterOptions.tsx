import React, { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { MultiSelect } from "@/components/layout/multi-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Info, AlertCircle } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectValue,
	SelectTrigger,
	SelectItem,
} from "@/components/ui/select";
import { FilterOptionsProps } from "@/types/props/FilterOptions";

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
		status: "",
		type: "",
		episodesRange: [
			[0, 3057],
			[0, 110],
		],
		chaptersRange: [0, 6477],
		volumesRange: [0, 200],
		startSeason: "",
		ignoreNA: true,
	});

	const handleFilterChange = (key: string, value: unknown) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const getEpisodesRange = () => {
		return filters.type === "tv" ? filters.episodesRange[0] : filters.episodesRange[1];
	};

	const setEpisodesRange = (newRange: [number, number]) => {
		setFilters((prev) => ({
			...prev,
			episodesRange:
				filters.type === "tv"
					? [newRange, prev.episodesRange[1]]
					: [prev.episodesRange[0], newRange],
		}));
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
						{/* Notice */}
						<div
							className={`flex items-center p-4 rounded-md ${
								isDarkMode ? "bg-red-600 text-white" : "bg-red-100 text-red-800"
							} border ${isDarkMode ? "border-red-700" : "border-red-300"}`}
						>
							<AlertCircle className="mr-2" size={24} />
							<span>
								Filters only apply to returned results and do not affect how results
								are returned. It is possible for no results to show from certain
								filters. Increase results returned per page in settings for more
								results when using filters.
							</span>
						</div>

						{/* General Filters */}
						<div>
							<Label
								className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}
							>
								Score Range
							</Label>
							<div className="flex items-center space-x-2">
								<input
									type="number"
									min={0}
									max={10}
									step={0.1}
									value={filters.scoreRange[0]}
									onChange={(e) =>
										handleFilterChange("scoreRange", [
											parseFloat(e.target.value),
											filters.scoreRange[1],
										])
									}
									className="w-16 p-1 border rounded"
								/>
								<Slider
									min={0}
									max={10}
									step={0.1}
									value={filters.scoreRange}
									onValueChange={(value) =>
										handleFilterChange("scoreRange", value)
									}
									className="flex-1"
								/>
								<input
									type="number"
									min={0}
									max={10}
									step={0.1}
									value={filters.scoreRange[1]}
									onChange={(e) =>
										handleFilterChange("scoreRange", [
											filters.scoreRange[0],
											parseFloat(e.target.value),
										])
									}
									className="w-16 p-1 border rounded"
								/>
							</div>
							<div
								className={`text-sm mt-1 text-center ${
									isDarkMode ? "text-gray-300" : "text-gray-700"
								}`}
							>
								{filters.scoreRange[0].toFixed(1)} -{" "}
								{filters.scoreRange[1].toFixed(1)}
							</div>
						</div>

						<div>
							<Label
								className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}
							>
								Start Year Range
							</Label>
							<div className="flex items-center space-x-2">
								<input
									type="number"
									min={1950}
									max={new Date().getFullYear()}
									step={1}
									value={filters.startYearRange[0]}
									onChange={(e) =>
										handleFilterChange("startYearRange", [
											parseInt(e.target.value, 10),
											filters.startYearRange[1],
										])
									}
									className="w-16 p-1 border rounded"
								/>
								<Slider
									min={1950}
									max={new Date().getFullYear()}
									step={1}
									value={filters.startYearRange}
									onValueChange={(value) =>
										handleFilterChange("startYearRange", value)
									}
									className="flex-1"
								/>
								<input
									type="number"
									min={1950}
									max={new Date().getFullYear()}
									step={1}
									value={filters.startYearRange[1]}
									onChange={(e) =>
										handleFilterChange("startYearRange", [
											filters.startYearRange[0],
											parseInt(e.target.value, 10),
										])
									}
									className="w-16 p-1 border rounded"
								/>
							</div>
							<div
								className={`text-sm mt-1 text-center ${
									isDarkMode ? "text-gray-300" : "text-gray-700"
								}`}
							>
								{filters.startYearRange[0]} - {filters.startYearRange[1]}
							</div>
						</div>

						{/* Anime-specific filters */}
						{isAnimeSearch && (
							<>
								<div>
									<Label
										className={`${
											isDarkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Start Season
									</Label>
									<Select
										onValueChange={(value) =>
											handleFilterChange("startSeason", value)
										}
									>
										<SelectTrigger
											className={`w-[250px] ${
												isDarkMode
													? "bg-gray-800 text-white"
													: "bg-white text-gray-900"
											}`}
										>
											<SelectValue placeholder="Select season" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="spring">Spring</SelectItem>
											<SelectItem value="summer">Summer</SelectItem>
											<SelectItem value="fall">Fall</SelectItem>
											<SelectItem value="winter">Winter</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label
										className={`${
											isDarkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Status
									</Label>
									<Select
										onValueChange={(value) =>
											handleFilterChange("status", value)
										}
									>
										<SelectTrigger
											className={`w-[250px] ${
												isDarkMode
													? "bg-gray-800 text-white"
													: "bg-white text-gray-900"
											}`}
										>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="finished_airing">
												Finished Airing
											</SelectItem>
											<SelectItem value="currently_airing">
												Currently Airing
											</SelectItem>
											<SelectItem value="not_yet_aired">
												Not Yet Aired
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label
										className={`${
											isDarkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Type
									</Label>
									<Select
										onValueChange={(value) => handleFilterChange("type", value)}
									>
										<SelectTrigger
											className={`w-[250px] ${
												isDarkMode
													? "bg-gray-800 text-white"
													: "bg-white text-gray-900"
											}`}
										>
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="tv">TV</SelectItem>
											<SelectItem value="movie">Movie</SelectItem>
											<SelectItem value="ova">OVA</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{/* Episodes Range for TV or OVA */}
								{(filters.type === "tv" || filters.type === "ova") && (
									<div>
										<Label
											className={`${
												isDarkMode ? "text-gray-300" : "text-gray-700"
											}`}
										>
											Episodes Range
										</Label>
										<div className="flex items-center space-x-2">
											<input
												type="number"
												min={0}
												max={filters.type === "tv" ? 3057 : 110}
												step={1}
												value={getEpisodesRange()[0]}
												onChange={(e) =>
													setEpisodesRange([
														parseInt(e.target.value, 10),
														getEpisodesRange()[1],
													])
												}
												className="w-16 p-1 border rounded"
											/>
											<Slider
												min={0}
												max={filters.type === "tv" ? 3057 : 110}
												step={1}
												value={getEpisodesRange()}
												onValueChange={(value) =>
													setEpisodesRange(value as [number, number])
												}
												className="flex-1"
											/>
											<input
												type="number"
												min={0}
												max={filters.type === "tv" ? 3057 : 110}
												step={1}
												value={getEpisodesRange()[1]}
												onChange={(e) =>
													setEpisodesRange([
														getEpisodesRange()[0],
														parseInt(e.target.value, 10),
													])
												}
												className="w-16 p-1 border rounded"
											/>
										</div>
										<div
											className={`text-sm mt-1 text-center ${
												isDarkMode ? "text-gray-300" : "text-gray-700"
											}`}
										>
											{getEpisodesRange()[0]} - {getEpisodesRange()[1]}
										</div>
									</div>
								)}
							</>
						)}

						{/* Manga-specific filters */}
						{!isAnimeSearch && (
							<>
								<div>
									<Label
										className={`${
											isDarkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Status
									</Label>
									<Select
										onValueChange={(value) =>
											handleFilterChange("status", value)
										}
									>
										<SelectTrigger
											className={`w-[250px] ${
												isDarkMode
													? "bg-gray-800 text-white"
													: "bg-white text-gray-900"
											}`}
										>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="finished">Finished</SelectItem>
											<SelectItem value="currently_publishing">
												Currently Publishing
											</SelectItem>
											<SelectItem value="on_hiatus">On Hiatus</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label
										className={`${
											isDarkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										Type
									</Label>
									<Select
										onValueChange={(value) => handleFilterChange("type", value)}
									>
										<SelectTrigger
											className={`w-[250px] ${
												isDarkMode
													? "bg-gray-800 text-white"
													: "bg-white text-gray-900"
											}`}
										>
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="manga">Manga</SelectItem>
											<SelectItem value="manhwa">Manhwa</SelectItem>
											<SelectItem value="manhua">Manhua</SelectItem>
											<SelectItem value="light_novel">Light Novel</SelectItem>
											<SelectItem value="one_shot">One Shot</SelectItem>
											<SelectItem value="doujinshi">Doujinshi</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div>
									<Label
										className={`${
											isDarkMode ? "text-gray-300" : "text-gray-700"
										} mb-2`}
									>
										Chapters Range
									</Label>
									<Slider
										min={0}
										max={6477}
										step={1}
										value={filters.chaptersRange}
										onValueChange={(value) =>
											handleFilterChange("chaptersRange", value)
										}
										className="mt-4"
									/>
									<div
										className={`text-sm mt-1 ${
											isDarkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										{filters.chaptersRange[0]} - {filters.chaptersRange[1]}
									</div>
								</div>

								<div>
									<Label
										className={`${
											isDarkMode ? "text-gray-300" : "text-gray-700"
										} mb-2`}
									>
										Volumes Range
									</Label>
									<Slider
										min={0}
										max={200}
										step={1}
										value={filters.volumesRange}
										onValueChange={(value) =>
											handleFilterChange("volumesRange", value)
										}
										className="mt-4"
									/>
									<div
										className={`text-sm mt-1 ${
											isDarkMode ? "text-gray-300" : "text-gray-700"
										}`}
									>
										{filters.volumesRange[0]} - {filters.volumesRange[1]}
									</div>
								</div>
							</>
						)}

						{/* Genres */}
						<div>
							<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
								Genres
							</Label>
							<MultiSelect
								options={genreOptions}
								onValueChange={(selected) => handleFilterChange("genres", selected)}
								defaultValue={filters.genres}
								placeholder="Select genres"
								maxCount={10}
								className={`${
									isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
								}`}
							/>
						</div>

						{/* Themes */}
						<div>
							<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
								Themes
							</Label>
							<MultiSelect
								options={themeOptions}
								onValueChange={(selected) => handleFilterChange("themes", selected)}
								defaultValue={filters.themes}
								placeholder="Select themes"
								maxCount={10}
								className={`${
									isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
								}`}
							/>
						</div>

						{/* Demographics */}
						<div>
							<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
								Demographics
							</Label>
							<MultiSelect
								options={demographicOptions}
								onValueChange={(selected) =>
									handleFilterChange("demographics", selected)
								}
								defaultValue={filters.demographics}
								placeholder="Select demographics"
								maxCount={10}
								className={`${
									isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
								}`}
							/>
						</div>

						{/* Ignore N/A Values */}
						<div className="flex items-center">
							<Checkbox
								checked={filters.ignoreNA}
								onCheckedChange={(checked) =>
									handleFilterChange("ignoreNA", checked)
								}
								className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
							>
								Ignore N/A Values
							</Checkbox>
							<div className="ml-2 flex items-center">
								<span
									className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
								>
									Ignore N/A Values
								</span>
								<div className="relative group ml-1">
									<Info
										className={`${
											isDarkMode ? "text-gray-300" : "text-gray-700"
										}`}
										size={16}
									/>
									<div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 shadow-lg">
										When checked, items with missing data for any filter
										criteria (such as score, start year, genres, themes, or
										demographics) will not be excluded from the results.
									</div>
								</div>
							</div>
						</div>

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
