import { Button } from "@/components/ui/button";
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
		<div className="flex items-center gap-4 mb-8">
			<textarea
				placeholder={`Describe the ${
					isAnimeSearch ? "anime" : "manga"
				} you're looking for, be as specific as possible. Writing the description as you would expect to see it on MAL or AniList will help.`}
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className={`flex-grow resize-y min-h-[3rem] p-2 rounded-md ${
					isDarkMode
						? "bg-gray-800 text-white placeholder-gray-400"
						: "bg-white text-gray-900"
				}`}
				style={{ height: 'auto', overflow: 'auto' }}
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
