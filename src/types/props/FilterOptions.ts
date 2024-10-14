import { Filters } from "../Filters";

export interface FilterOptionsProps {
	isAnimeSearch: boolean;
	isDarkMode: boolean;
	onFilterChange: (filters: Filters) => void;
}
