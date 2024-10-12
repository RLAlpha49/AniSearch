import { Settings } from "@/types/Settings";

export interface HeaderProps {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
	isAnimeSearch: boolean;
	settings: Settings;
	setSettings: React.Dispatch<React.SetStateAction<Settings>>;
	models: string[];
}
