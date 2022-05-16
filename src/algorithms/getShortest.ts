import { INode } from "../types";

export const getShortest = (
	grid: INode[][],
	currentPath: string | null | undefined,
	parents: Map<string, string | null>
): INode[] => {
	const path: INode[] = [];
	while (currentPath && currentPath !== "start") {
		const [row, col] = currentPath.split(" ");
		grid[Number(row)][Number(col)].isPath = true;
		currentPath = parents.get(currentPath);
		path.push(grid[Number(row)][Number(col)]);
	}
	return path;
};
