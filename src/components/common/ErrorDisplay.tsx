import { ErrorDisplayProps } from "@/types/props/ErrorDisplay";

export function ErrorDisplay({ error }: ErrorDisplayProps) {
	if (!error) return null;

	return (
		<div className="text-center text-red-500 mb-4">
			<p>{error}</p>
		</div>
	);
}
