import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FilterProps } from "@/types/props/Filter";
import { MultiSelect } from "@/components/layout/multi-select";
import { Book, BookOpen, Calendar, Layers } from "lucide-react";

export function MangaSpecificFilters({ filters, handleFilterChange, isDarkMode }: FilterProps) {
	return (
		<>
			<div>
				<Label
					className={`${
						isDarkMode ? "text-gray-300" : "text-gray-700"
					} flex items-center`}
				>
					<Calendar className="w-4 h-4 mr-2 text-blue-500" />
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
						isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
					}`}
				/>
			</div>
			<div>
				<Label
					className={`${
						isDarkMode ? "text-gray-300" : "text-gray-700"
					} flex items-center`}
				>
					<Book className="w-4 h-4 mr-2 text-purple-500" />
					Type
				</Label>
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
					className={`${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-black"}`}
				/>
			</div>

			<div>
				<Label
					className={`${
						isDarkMode ? "text-gray-300" : "text-gray-700"
					} mb-2 flex items-center`}
				>
					<BookOpen className="w-4 h-4 mr-2 text-purple-500" />
					Chapters Range
				</Label>
				<div className="flex items-center space-x-2">
					<input
						type="number"
						min={0}
						max={6477}
						step={1}
						value={filters?.chaptersRange[0]}
						onChange={(e) =>
							handleFilterChange("chaptersRange", [
								parseInt(e.target.value, 10),
								filters?.chaptersRange[1],
							])
						}
						className="w-16 p-1 border rounded text-gray-900"
					/>
					<Slider
						min={0}
						max={6477}
						step={1}
						value={filters?.chaptersRange}
						onValueChange={(value) => handleFilterChange("chaptersRange", value)}
						className="flex-1"
					/>
					<input
						type="number"
						min={0}
						max={6477}
						step={1}
						value={filters?.chaptersRange[1]}
						onChange={(e) =>
							handleFilterChange("chaptersRange", [
								filters?.chaptersRange[0],
								parseInt(e.target.value, 10),
							])
						}
						className="w-16 p-1 border rounded text-gray-900"
					/>
				</div>
				<div
					className={`text-sm mt-1 ${
						isDarkMode ? "text-gray-300" : "text-gray-700"
					} text-center`}
				>
					{filters?.chaptersRange[0]} - {filters?.chaptersRange[1]}
				</div>
			</div>

			<div>
				<Label
					className={`${
						isDarkMode ? "text-gray-300" : "text-gray-700"
					} mb-2 flex items-center`}
				>
					<Layers className="w-4 h-4 mr-2 text-red-500" />
					Volumes Range
				</Label>
				<div className="flex items-center space-x-2">
					<input
						type="number"
						min={0}
						max={200}
						step={1}
						value={filters?.volumesRange[0]}
						onChange={(e) =>
							handleFilterChange("volumesRange", [
								parseInt(e.target.value, 10),
								filters?.volumesRange[1],
							])
						}
						className="w-16 p-1 border rounded text-gray-900"
					/>
					<Slider
						min={0}
						max={200}
						step={1}
						value={filters?.volumesRange}
						onValueChange={(value) => handleFilterChange("volumesRange", value)}
						className="flex-1"
					/>
					<input
						type="number"
						min={0}
						max={200}
						step={1}
						value={filters?.volumesRange[1]}
						onChange={(e) =>
							handleFilterChange("volumesRange", [
								filters?.volumesRange[0],
								parseInt(e.target.value, 10),
							])
						}
						className="w-16 p-1 border rounded text-gray-900"
					/>
				</div>
				<div
					className={`text-sm mt-1 ${
						isDarkMode ? "text-gray-300" : "text-gray-700"
					} text-center`}
				>
					{filters?.volumesRange[0]} - {filters?.volumesRange[1]}
				</div>
			</div>
		</>
	);
}
