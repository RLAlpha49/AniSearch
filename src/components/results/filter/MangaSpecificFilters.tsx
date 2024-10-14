import React from "react";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectValue,
	SelectTrigger,
	SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FilterProps } from "@/types/props/Filter";

export function MangaSpecificFilters({ filters, handleFilterChange, isDarkMode }: FilterProps) {
	return (
		<>
			<div>
				<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
					Status
				</Label>
				<Select onValueChange={(value) => handleFilterChange("status", value)}>
					<SelectTrigger
						className={`w-[250px] ${
							isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
						}`}
					>
						<SelectValue placeholder="Select status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="finished">Finished</SelectItem>
						<SelectItem value="currently_publishing">Currently Publishing</SelectItem>
						<SelectItem value="on_hiatus">On Hiatus</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div>
				<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>Type</Label>
				<Select onValueChange={(value) => handleFilterChange("type", value)}>
					<SelectTrigger
						className={`w-[250px] ${
							isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
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
