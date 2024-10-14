import React from "react";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/layout/multi-select";
import { Slider } from "@/components/ui/slider";
import { FilterProps } from "@/types/props/Filter";

export function AnimeSpecificFilters({ filters, handleFilterChange, isDarkMode }: FilterProps) {
	const getEpisodesRange = (): [number, number] => {
		return filters?.type.includes("tv")
			? (filters?.episodesRange[0] as [number, number])
			: (filters?.episodesRange[1] as [number, number]);
	};

	const setEpisodesRange = (newRange: [number, number]) => {
		handleFilterChange(
			"episodesRange",
			filters?.type.includes("tv")
				? [newRange, filters?.episodesRange[1]]
				: [filters?.episodesRange[0], newRange]
		);
	};

	return (
		<>
			<div>
				<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
					Start Season
				</Label>
				<MultiSelect
					options={[
						{ label: "Spring", value: "spring" },
						{ label: "Summer", value: "summer" },
						{ label: "Fall", value: "fall" },
						{ label: "Winter", value: "winter" },
					]}
					onValueChange={(selected) => handleFilterChange("startSeason", selected)}
					defaultValue={filters?.startSeason}
					placeholder="Select seasons"
					className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
				/>
			</div>

			<div>
				<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
					Status
				</Label>
				<MultiSelect
					options={[
						{ label: "Finished Airing", value: "finished_airing" },
						{ label: "Currently Airing", value: "currently_airing" },
						{ label: "Not Yet Aired", value: "not_yet_aired" },
					]}
					onValueChange={(selected) => handleFilterChange("status", selected)}
					defaultValue={filters?.status}
					placeholder="Select status"
					className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
				/>
			</div>

			<div>
				<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Type</Label>
				<MultiSelect
					options={[
						{ label: "TV", value: "tv" },
						{ label: "Movie", value: "movie" },
						{ label: "OVA", value: "ova" },
					]}
					onValueChange={(selected) => handleFilterChange("type", selected)}
					defaultValue={filters?.type}
					placeholder="Select type"
					className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
				/>
			</div>

			{/* Episodes Range for TV or OVA */}
			{(filters?.type.includes("tv") || filters?.type.includes("ova")) && (
				<div>
					<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
						Episodes Range
					</Label>
					<div className="flex items-center space-x-2">
						<input
							type="number"
							min={0}
							max={filters.type.includes("tv") ? 3057 : 110}
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
							max={filters.type.includes("tv") ? 3057 : 110}
							step={1}
							value={getEpisodesRange()}
							onValueChange={(value) => {
								setEpisodesRange(value as [number, number]);
							}}
							className="flex-1"
						/>
						<input
							type="number"
							min={0}
							max={filters.type.includes("tv") ? 3057 : 110}
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
	);
}
