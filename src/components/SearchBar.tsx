import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	handleSearch: () => void;
	isDarkMode: boolean;
}

export function SearchBar({
	searchQuery,
	setSearchQuery,
	handleSearch,
	isDarkMode,
}: SearchBarProps) {
	return (
		<div className="flex gap-4 mb-8">
			<Input
				type="text"
				placeholder="Describe the anime you're looking for..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className={`flex-grow ${
					isDarkMode
						? "bg-gray-800 text-white placeholder-gray-400"
						: "bg-white text-gray-900"
				}`}
			/>
			<Button
				onClick={handleSearch}
				className={
					isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
				}
			>
				Find Anime
			</Button>
		</div>
	);
}
