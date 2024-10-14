import React from "react";
import { AlertCircle } from "lucide-react";

export function FilterNotice({ isDarkMode }: { isDarkMode: boolean }) {
	return (
		<div
			className={`flex items-center p-4 rounded-md ${
				isDarkMode ? "bg-red-600 text-white" : "bg-red-100 text-red-800"
			} border ${isDarkMode ? "border-red-700" : "border-red-300"}`}
		>
			<AlertCircle className="mr-2" size={24} />
			<span>
				Filters only apply to returned results and do not affect how results are returned.
				It is possible for no results to show from certain filters. Increase results
				returned per page in settings for more results when using filters.
			</span>
		</div>
	);
}
