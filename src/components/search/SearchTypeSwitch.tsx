import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SearchTypeSwitchProps } from "@/types/props/SearchTypeSwitch";

export function SearchTypeSwitch({
	isAnimeSearch,
	toggleSearchType,
	isDarkMode,
}: SearchTypeSwitchProps) {
	return (
		<div className="flex items-center gap-4 mb-4">
			<Switch id="search-type" checked={isAnimeSearch} onCheckedChange={toggleSearchType} />
			<Label
				htmlFor="search-type"
				className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
			>
				Search for: {isAnimeSearch ? "Anime" : "Manga"}
			</Label>
		</div>
	);
}
