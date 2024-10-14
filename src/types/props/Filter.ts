import { Filters } from "../Filters";

export interface FilterOption {
	label: string;
	value: string;
	icon?: React.ComponentType<{ className?: string }>;
}

export interface FilterProps {
	label?: string;
	options?: FilterOption[];
	selected?: string[];
	filters?: Filters;
	handleFilterChange: (key: string, value: unknown) => void;
	isDarkMode: boolean;
}
