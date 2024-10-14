import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FilterProps } from "@/types/props/Filter";
import { MultiSelect } from "@/components/layout/multi-select";

export function MangaSpecificFilters({ filters, handleFilterChange, isDarkMode }: FilterProps) {
	return (
		<>
			<div>
				<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
					Status
				</Label>
				<MultiSelect
					options={[
						{ label: "Finished", value: "finished" },
						{ label: "Currently Publishing", value: "currently_publishing" },
						{ label: "On Hiatus", value: "on_hiatus" },
					]}
					onValueChange={(value) => handleFilterChange("status", value)}
					defaultValue={filters?.status}
					placeholder="Select status"
					className={`${
						isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
					}`}
				/>
			</div>
			<div>
				<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Type</Label>
				<MultiSelect
					options={[
						{ label: "Manga", value: "manga" },
						{ label: "Manhwa", value: "manhwa" },
						{ label: "Manhua", value: "manhua" },
						{ label: "Light Novel", value: "light_novel" },
						{ label: "One Shot", value: "one_shot" },
						{ label: "Doujinshi", value: "doujinshi" },
					]}
					onValueChange={(value) => handleFilterChange("type", value)}
					defaultValue={filters?.type}
					placeholder="Select type"
					className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
				/>
			</div>

			<div>
				<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
					Chapters Range
				</Label>
				<Slider
					min={0}
					max={6477}
					step={1}
					value={filters?.chaptersRange}
					onValueChange={(value) => handleFilterChange("chaptersRange", value)}
					className="mt-4"
				/>
				<div className={`text-sm mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
					{filters?.chaptersRange[0]} - {filters?.chaptersRange[1]}
				</div>
			</div>

			<div>
				<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2`}>
					Volumes Range
				</Label>
				<Slider
					min={0}
					max={200}
					step={1}
					value={filters?.volumesRange}
					onValueChange={(value) => handleFilterChange("volumesRange", value)}
					className="mt-4"
				/>
				<div className={`text-sm mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
					{filters?.volumesRange[0]} - {filters?.volumesRange[1]}
				</div>
			</div>
		</>
	);
}
