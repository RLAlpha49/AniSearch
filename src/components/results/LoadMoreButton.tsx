import React from "react";
import { Button } from "@/components/ui/button";
import { LoadMoreButtonProps } from "@/types/props/LoadMoreButton";

export function LoadMoreButton({ isDarkMode, onClick }: LoadMoreButtonProps) {
	return (
		<div className="mt-8 text-center">
			<Button
				onClick={onClick}
				className={
					isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
				}
			>
				Load More
			</Button>
		</div>
	);
}
