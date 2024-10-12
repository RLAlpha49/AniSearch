import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingIndicator } from "../common/LoadingIndicator";
import { SearchInputProps } from "@/types/props/SearchInput";

export function SearchInput({
	searchQuery,
	setSearchQuery,
	handleSearch,
	isLoading,
	isLoadingMore,
	isDarkMode,
	isAnimeSearch,
}: SearchInputProps) {
	return (
		<div className="flex gap-4 mb-8">
			<Input
				type="text"
				placeholder={`Describe the ${
					isAnimeSearch ? "anime" : "manga"
				} you're looking for...`}
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
				disabled={isLoading || isLoadingMore}
				className={`${
					isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
				} ${isLoading || isLoadingMore ? "opacity-50 cursor-not-allowed" : ""}`}
			>
				{isLoading || isLoadingMore ? (
					<LoadingIndicator
						isLoading={isLoading}
						isLoadingMore={isLoadingMore}
						isDarkMode={isDarkMode}
						isAnimeSearch={isAnimeSearch}
						inline={true}
						customMessage=""
					/>
				) : (
					`Find ${isAnimeSearch ? "Anime" : "Manga"}`
				)}
			</Button>
		</div>
	);
}
