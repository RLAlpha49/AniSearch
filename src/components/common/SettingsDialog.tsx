import React from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { SettingsDialogProps } from "@/types/props/SettingsDialog";

export function SettingsDialog({ isDarkMode, settings, setSettings, models }: SettingsDialogProps) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className={
						isDarkMode
							? "text-white hover:text-gray-300"
							: "text-gray-900 hover:text-gray-600"
					}
				>
					<Settings className="h-6 w-6" />
					<span className="sr-only">Settings</span>
				</Button>
			</DialogTrigger>
			<DialogContent
				className={isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}
				style={{ maxWidth: "90%", width: "500px" }}
			>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
					<DialogDescription>Customize your search experience</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex items-center gap-4">
						<Label htmlFor="defaultModel" className="w-1/4 text-right">
							Default Model
						</Label>
						<div className="flex-grow">
							<Select
								value={settings.defaultModel}
								onValueChange={(value) =>
									setSettings((prev) => ({
										...prev,
										defaultModel: value,
									}))
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select model" />
								</SelectTrigger>
								<SelectContent>
									{models.map((model) => (
										<SelectItem key={model} value={model}>
											{model === "sentence-t5-xl"
												? `${model} (Default)`
												: model}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<Label htmlFor="pageTheme" className="w-1/4 text-right">
							Page Theme
						</Label>
						<div className="flex-grow">
							<RadioGroup
								value={settings.pageTheme}
								onValueChange={(value) =>
									setSettings((prev) => ({
										...prev,
										pageTheme: value,
									}))
								}
								className="flex"
							>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="light"
										id="light"
										className={`${
											settings.pageTheme === "light"
												? isDarkMode
													? "text-white"
													: "text-black"
												: ""
										}`}
									/>
									<Label htmlFor="light">Light</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="dark"
										id="dark"
										className={`${
											settings.pageTheme === "dark" ||
											(settings.pageTheme === "system" && isDarkMode)
												? "text-white"
												: ""
										}`}
									/>
									<Label htmlFor="dark">Dark</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem
										value="system"
										id="system"
										className={`${
											settings.pageTheme === "system" && isDarkMode
												? "text-white"
												: ""
										}`}
									/>
									<Label htmlFor="system">System</Label>
								</div>
							</RadioGroup>
						</div>
					</div>
					<div className="flex items-center gap-4">
						<Label htmlFor="resultsPerPage" className="w-1/4 text-right">
							Results Per Page
						</Label>
						<div className="flex-grow">
							<Select
								value={settings.resultsPerPage}
								onValueChange={(value) => {
									if (value === "custom") {
										setSettings((prev) => ({
											...prev,
											resultsPerPage: "",
										}));
									} else {
										setSettings((prev) => ({
											...prev,
											resultsPerPage: value,
											customResultsPerPage: "",
										}));
									}
								}}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select number" />
								</SelectTrigger>
								<SelectContent>
									{["3", "6", "9", "12", "custom"].map((number) => (
										<SelectItem key={number} value={number}>
											{number === "custom" ? "Custom" : number}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{settings.resultsPerPage === "" && (
								<Input
									type="number"
									value={settings.customResultsPerPage || ""}
									onChange={(e) =>
										setSettings((prev) => ({
											...prev,
											customResultsPerPage: e.target.value,
										}))
									}
									placeholder="Enter custom number"
									className="mt-2"
									min="1"
								/>
							)}
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
