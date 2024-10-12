export interface SearchInputProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	handleSearch: () => void;
	isLoading: boolean;
	isLoadingMore: boolean;
	isDarkMode: boolean;
	isAnimeSearch: boolean;
}
