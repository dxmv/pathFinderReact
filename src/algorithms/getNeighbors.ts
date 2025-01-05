import { INode } from "../types";

const getUnvisitedNeighbors = (
	grid: INode[][],
	current: INode,
	visited: Set<INode>
): INode[] => {
	const arr: INode[] = [];
	const { row, col } = current;
	const dirs = [
		[row - 1, col],
		[row + 1, col],
		[row, col - 1],
		[row, col + 1],
	];

	for (const [r, c] of dirs) {
		if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
			if (!visited.has(grid[r][c]) && !grid[r][c].isWall) {
				arr.push(grid[r][c]);
			}
		}
	}
	return arr;
};

export default getUnvisitedNeighbors;
