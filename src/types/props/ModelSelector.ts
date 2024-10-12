export interface ModelSelectorProps {
	currentModel: string;
	setCurrentModel: (model: string) => void;
	models: string[];
	isDarkMode: boolean;
	changeModel: (direction: "next" | "prev") => void;
}
