import { Loader2 } from "lucide-react";
import { LoadingIndicatorProps } from "@/types/props/LoadingIndicator";

export function LoadingIndicator({
	isLoading,
	isLoadingMore,
	isDarkMode,
	isAnimeSearch,
	inline = false,
	customMessage,
}: LoadingIndicatorProps) {
	if (!isLoading && !isLoadingMore) return null;

	const message =
		customMessage ||
		(isLoading
			? `Searching for ${isAnimeSearch ? "Anime" : "Manga"}...`
			: `Loading more ${isAnimeSearch ? "Anime" : "Manga"}...`);

	return (
		<div
			className={`text-center ${isDarkMode ? "text-white" : "text-gray-900"} ${
				inline ? "inline-flex items-center" : "mt-4"
			}`}
		>
			<Loader2 className="h-8 w-8 animate-spin mx-auto" />
			<p className="mt-2">{message}</p>
		</div>
	);
}
