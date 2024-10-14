import { Filters } from "../Filters";
import React from "react";

export interface FilterOptionsProps {
	isAnimeSearch: boolean;
	isDarkMode: boolean;
	filters: Filters;
	setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}
