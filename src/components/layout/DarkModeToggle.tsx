import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { DarkModeToggleProps } from "@/types/props/DarkModeToggle";

export function DarkModeToggle({ isDarkMode, toggleDarkMode }: DarkModeToggleProps) {
	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleDarkMode}
			className={
				isDarkMode ? "text-white hover:text-gray-300" : "text-gray-900 hover:text-gray-600"
			}
		>
			{isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
		</Button>
	);
}
