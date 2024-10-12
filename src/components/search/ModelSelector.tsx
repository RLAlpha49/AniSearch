import React from "react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { ModelSelectorProps } from "@/types/props/ModelSelector";

export function ModelSelector({
	currentModel,
	setCurrentModel,
	models,
	isDarkMode,
	changeModel,
}: ModelSelectorProps) {
	return (
		<div className="flex items-center gap-1.5 mb-4">
			<Button
				variant="outline"
				size="icon"
				onClick={() => changeModel("prev")}
				className={isDarkMode ? "text-white" : "text-gray-900"}
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>
			<Select value={currentModel} onValueChange={setCurrentModel}>
				<SelectTrigger
					className={`w-[250px] ${
						isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
					}`}
				>
					<SelectValue placeholder="Select model" />
				</SelectTrigger>
				<SelectContent>
					{models.map((model) => (
						<SelectItem key={model} value={model}>
							{model}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button
				variant="outline"
				size="icon"
				onClick={() => changeModel("next")}
				className={isDarkMode ? "text-white" : "text-gray-900"}
			>
				<ChevronRight className="h-4 w-4" />
			</Button>
			<a
				href="https://sbert.net/docs/sentence_transformer/pretrained_models.html"
				target="_blank"
				rel="noopener noreferrer"
				className="ml-2 text-blue-500 hover:text-blue-700"
				title="More info about models used"
			>
				<Info className="h-5 w-5" />
			</a>
		</div>
	);
}
