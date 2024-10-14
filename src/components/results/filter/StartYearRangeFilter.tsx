import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FilterProps } from "@/types/props/Filter";
import { Calendar } from "lucide-react";

export function StartYearRangeFilter({ filters, handleFilterChange, isDarkMode }: FilterProps) {
	return (
		<div>
			<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} mb-2 flex items-center`}>
				<Calendar className="w-4 h-4 mr-2 text-green-500" />
				Start Year Range
			</Label>
			<div className="flex items-center space-x-2">
				<input
					type="number"
					min={1917}
					max={new Date().getFullYear() + 1}
					step={1}
					value={filters?.startYearRange[0]}
					onChange={(e) =>
						handleFilterChange("startYearRange", [
							parseInt(e.target.value, 10),
							filters?.startYearRange[1],
						])
					}
					className="w-16 p-1 border rounded text-gray-900"
				/>
				<Slider
					min={1917}
					max={new Date().getFullYear() + 1}
					step={1}
					value={filters?.startYearRange}
					onValueChange={(value) => handleFilterChange("startYearRange", value)}
					className="flex-1"
				/>
				<input
					type="number"
					min={1917}
					max={new Date().getFullYear() + 1}
					step={1}
					value={filters?.startYearRange[1]}
					onChange={(e) =>
						handleFilterChange("startYearRange", [
							filters?.startYearRange[0],
							parseInt(e.target.value, 10),
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
				{filters?.startYearRange[0]} - {filters?.startYearRange[1]}
			</div>
		</div>
	);
}
