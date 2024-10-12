import React from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { SettingsDialog } from "../common/SettingsDialog";
import { HeaderProps } from "@/types/props/Header";

export function Header({
	isDarkMode,
	toggleDarkMode,
	isAnimeSearch,
	settings,
	setSettings,
	models,
}: HeaderProps) {
	return (
		<div className="flex justify-between items-center mb-8">
			<h1 className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
				{isAnimeSearch ? "Anime" : "Manga"} Search
			</h1>
			<div className="flex items-center gap-2">
				<SettingsDialog
					isDarkMode={isDarkMode}
					settings={settings}
					setSettings={setSettings}
					models={models}
				/>
				<Button
					variant="ghost"
					size="icon"
					onClick={toggleDarkMode}
					className={
						isDarkMode
							? "text-white hover:text-gray-300"
							: "text-gray-900 hover:text-gray-600"
					}
				>
					{isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
				</Button>
			</div>
		</div>
	);
}
