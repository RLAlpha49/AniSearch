import { Settings } from "@/types/Settings";

export interface SettingsDialogProps {
	isDarkMode: boolean;
	settings: Settings;
	setSettings: React.Dispatch<React.SetStateAction<Settings>>;
	models: string[];
}
