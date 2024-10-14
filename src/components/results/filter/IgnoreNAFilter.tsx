import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";
import { FilterProps } from "@/types/props/Filter";

export function IgnoreNAFilter({ filters, handleFilterChange, isDarkMode }: FilterProps) {
	return (
		<div className="flex items-center">
			<Checkbox
				checked={filters?.ignoreNA}
				onCheckedChange={(checked) => handleFilterChange("ignoreNA", checked)}
				className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
			>
				Ignore N/A Values
			</Checkbox>
			<div className="ml-2 flex items-center">
				<span className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
					Ignore N/A Values
				</span>
				<div className="relative group ml-1">
					<Info
						className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
						size={16}
					/>
					<div className="absolute left-0 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded p-2 shadow-lg">
						When checked, items with missing data for any filter criteria (such as
						score, start year, genres, themes, or demographics) will not be excluded
						from the results.
					</div>
				</div>
			</div>
		</div>
	);
}
