import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FilterProps } from "@/types/props/Filter";
import { Star } from "lucide-react";

export function ScoreRangeFilter({ filters, handleFilterChange, isDarkMode }: FilterProps) {
	return (
		<div>
			<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2 flex items-center`}>
				<Star className="w-4 h-4 mr-2 text-yellow-500" /> Score Range
			</Label>
			<div className="flex items-center space-x-2">
				<input
					type="number"
					min={0}
					max={10}
					step={0.1}
					value={filters?.scoreRange[0]}
					onChange={(e) =>
						handleFilterChange("scoreRange", [
							parseFloat(e.target.value),
							filters?.scoreRange[1],
						])
					}
					className="w-16 p-1 border rounded text-gray-900"
				/>
				<Slider
					min={0}
					max={10}
					step={0.1}
					value={filters?.scoreRange}
					onValueChange={(value) => handleFilterChange("scoreRange", value)}
					className="flex-1"
				/>
				<input
					type="number"
					min={0}
					max={10}
					step={0.1}
					value={filters?.scoreRange[1]}
					onChange={(e) =>
						handleFilterChange("scoreRange", [
							filters?.scoreRange[0],
							parseFloat(e.target.value),
						])
					}
					className="w-16 p-1 border rounded text-gray-900"
				/>
			</div>
			<div
				className={`text-sm mt-1 text-center ${
					isDarkMode ? "text-gray-300" : "text-gray-700"
				}`}
			>
				{filters?.scoreRange[0].toFixed(1)} - {filters?.scoreRange[1].toFixed(1)}
			</div>
		</div>
	);
}
