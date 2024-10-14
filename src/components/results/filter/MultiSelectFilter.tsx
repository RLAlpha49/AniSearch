import React from "react";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/layout/multi-select";
import { FilterProps } from "@/types/props/Filter";

export function MultiSelectFilter({
	label,
	options,
	selected,
	handleFilterChange,
	isDarkMode,
}: FilterProps) {
	return (
		<div>
			<Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>{label}</Label>
			<MultiSelect
				options={options ?? []}
				onValueChange={(selected) =>
					handleFilterChange(label?.toLowerCase() ?? "", selected)
				}
				defaultValue={selected}
				placeholder={`Select ${label?.toLowerCase() ?? ""}`}
				maxCount={10}
				className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
			/>
		</div>
	);
}
