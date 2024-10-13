import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MangaCardProps } from "@/types/props/MangaCard";
import {
	Star,
	BookOpen,
	Layers,
	Calendar,
	Tag,
	Users,
	CalendarDays,
	SwatchBook,
} from "lucide-react";
import { InfoItemProps } from "@/types/props/InfoItem";

export function MangaCard({ manga, isDarkMode }: MangaCardProps) {
	const capitalizeTitle = (str: string) => {
		const exceptions = [
			"a",
			"an",
			"and",
			"as",
			"at",
			"but",
			"by",
			"for",
			"in",
			"nor",
			"of",
			"on",
			"or",
			"so",
			"the",
			"to",
			"up",
			"yet",
		];
		return str
			.split(" ")
			.map((word, index, arr) => {
				if (
					exceptions.includes(word.toLowerCase()) &&
					index !== 0 &&
					index !== arr.length - 1
				) {
					return word.toLowerCase();
				}
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			})
			.join(" ");
	};

	const parseStringArray = (input: string | string[]): string[] => {
		if (typeof input === "string") {
			return input.startsWith("[") && input.endsWith("]")
				? input
						.slice(1, -1)
						.split(",")
						.map((item) => item.trim().replace(/^['"]|['"]$/g, ""))
						.filter((item) => item !== "")
				: [];
		}
		return Array.isArray(input) ? input.filter((item) => item !== "") : [];
	};

	const formatType = (type: string | undefined): string => {
		if (!type) return "N/A";
		return type
			.replace(/_/g, " ")
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" ");
	};

	const formatStatus = (status: string | undefined): string => {
		if (!status) return "N/A";
		if (status === "currently_publishing") return "Currently Publishing";
		if (status === "finished") return "Finished";
		return capitalizeTitle(status.replace(/_/g, " "));
	};

	const genres = parseStringArray(manga.genres);
	const themes = parseStringArray(manga.themes);
	const demographics = manga.demographics ? parseStringArray(manga.demographics) : [];

	const cardContent = (
		<Card
			className={`transition-transform transform ${manga.url ? "hover:scale-105" : ""} ${
				isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
			} h-full flex flex-col overflow-hidden`}
		>
			<div className="flex flex-col sm:flex-row flex-grow select-text">
				<div className="w-full h-80 sm:w-1/3 sm:h-auto relative">
					{manga.main_picture ? (
						<Image
							src={manga.main_picture}
							alt={manga.title}
							layout="fill"
							objectFit="cover"
						/>
					) : (
						<div className="w-full h-full bg-gray-200 flex items-center justify-center">
							<span className="text-gray-500">No Image</span>
						</div>
					)}
				</div>
				<CardContent className="w-full sm:w-2/3 p-4 relative flex flex-col flex-grow">
					<div className="space-y-2 flex flex-col h-full">
						<div className="flex justify-between items-start">
							<h2
								className={`text-lg font-semibold ${
									isDarkMode ? "text-white" : "text-gray-900"
								}`}
								style={{ paddingRight: "20px" }}
							>
								{manga.url ? (
									<a
										href={manga.url}
										target="_blank"
										rel="noopener noreferrer"
										className={`hover:underline ${
											isDarkMode ? "text-blue-400" : "text-blue-600"
										}`}
									>
										{capitalizeTitle(manga.title)}
									</a>
								) : (
									capitalizeTitle(manga.title)
								)}
							</h2>
							<span
								className={`text-sm font-bold px-2 py-1 rounded ${
									isDarkMode
										? "bg-blue-700 text-white"
										: "bg-blue-100 text-blue-800"
								}`}
							>
								{(manga.similarity * 100).toFixed(2)}%
							</span>
						</div>
						<p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
							{manga.title_english && manga.title_english !== manga.title
								? capitalizeTitle(manga.title_english)
								: null}
							{manga.title_japanese && (
								<span className="block">{manga.title_japanese}</span>
							)}
						</p>
						<p
							className={`text-sm ${
								isDarkMode ? "text-gray-300" : "text-gray-600"
							} line-clamp-2`}
						>
							{manga.synopsis || "No synopsis available."}
						</p>
						<div className="mt-2 grid grid-cols-2 gap-2">
							<InfoItem
								icon={<Star className="w-4 h-4" />}
								label="Score"
								value={manga.score !== null ? manga.score.toFixed(2) : "N/A"}
								isDarkMode={isDarkMode}
								color="yellow"
							/>
							<InfoItem
								icon={<BookOpen className="w-4 h-4" />}
								label={formatType(manga.type)}
								value={`${manga.chapters !== null ? manga.chapters : "N/A"} ch`}
								isDarkMode={isDarkMode}
								color="purple"
							/>
							<InfoItem
								icon={<CalendarDays className="w-4 h-4" />}
								label="Start Year"
								value={
									manga.start_date
										? new Date(manga.start_date).getFullYear()
										: "N/A"
								}
								isDarkMode={isDarkMode}
								color="green"
							/>
							<InfoItem
								icon={<Calendar className="w-4 h-4" />}
								label="Status"
								value={formatStatus(manga.status)}
								isDarkMode={isDarkMode}
								color="blue"
							/>
							<InfoItem
								icon={<Layers className="w-4 h-4" />}
								label="Volumes"
								value={manga.volumes !== null ? manga.volumes : "N/A"}
								isDarkMode={isDarkMode}
								color="red"
							/>
						</div>
						<div className="mt-auto space-y-2">
							{genres.length > 0 && (
								<div>
									<h3
										className={`flex items-center text-sm font-semibold ${
											isDarkMode ? "text-gray-200" : "text-gray-700"
										}`}
										style={{ paddingBottom: "5px" }}
									>
										<Tag className="w-4 h-4 mr-1" />
										Genres
									</h3>
									<div className="flex flex-wrap gap-1">
										{genres.map((genre, index) => (
											<span
												key={index}
												className={`text-xs px-2 py-1 rounded ${
													isDarkMode
														? "bg-green-700 text-green-200"
														: "bg-green-200 text-green-700"
												}`}
											>
												{genre}
											</span>
										))}
									</div>
								</div>
							)}
							{themes.length > 0 && (
								<div>
									<h3
										className={`flex items-center text-sm font-semibold ${
											isDarkMode ? "text-gray-200" : "text-gray-700"
										}`}
										style={{ paddingBottom: "5px" }}
									>
										<SwatchBook className="w-4 h-4 mr-1" />
										Themes
									</h3>
									<div className="flex flex-wrap gap-1">
										{themes.map((theme, index) => (
											<span
												key={index}
												className={`text-xs px-2 py-1 rounded ${
													isDarkMode
														? "bg-purple-700 text-purple-200"
														: "bg-purple-200 text-purple-700"
												}`}
											>
												{theme}
											</span>
										))}
									</div>
								</div>
							)}
							{demographics.length > 0 && (
								<div>
									<h3
										className={`flex items-center text-sm font-semibold ${
											isDarkMode ? "text-gray-200" : "text-gray-700"
										}`}
										style={{ paddingBottom: "5px" }}
									>
										<Users className="w-4 h-4 mr-1" />
										Demographics
									</h3>
									<div className="flex flex-wrap gap-1">
										{demographics.map((demo, index) => (
											<span
												key={index}
												className={`text-xs px-2 py-1 rounded ${
													isDarkMode
														? "bg-blue-700 text-blue-200"
														: "bg-blue-200 text-blue-700"
												}`}
											>
												{demo}
											</span>
										))}
									</div>
								</div>
							)}
						</div>
					</div>
				</CardContent>
			</div>
		</Card>
	);

	return cardContent;
}

function InfoItem({ icon, label, value, isDarkMode, color }: InfoItemProps) {
	const getColorClasses = (color: string, isDarkMode: boolean) => {
		const baseClasses = "flex items-center p-2 rounded";
		const colorClasses = {
			yellow: isDarkMode
				? "bg-yellow-900/30 text-yellow-200"
				: "bg-yellow-100 text-yellow-800",
			purple: isDarkMode
				? "bg-purple-900/30 text-purple-200"
				: "bg-purple-100 text-purple-800",
			green: isDarkMode ? "bg-green-900/30 text-green-200" : "bg-green-100 text-green-800",
			blue: isDarkMode ? "bg-blue-900/30 text-blue-200" : "bg-blue-100 text-blue-800",
			red: isDarkMode ? "bg-red-900/30 text-red-200" : "bg-red-100 text-red-800",
		};
		return `${baseClasses} ${colorClasses[color as keyof typeof colorClasses]}`;
	};

	return (
		<div className={getColorClasses(color, isDarkMode)}>
			{icon}
			<div className="ml-2">
				<div className="text-xs font-medium">{label}</div>
				<div className="text-sm font-semibold">{value}</div>
			</div>
		</div>
	);
}
