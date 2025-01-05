import { INode } from "../types";

export const getUnvisitedNodes = (
	grid: INode[][],
	current: INode,
	unvisitedQueue: INode[],
	visited: boolean[][]
) => {
	const { row, col } = current;
	const dirs = [
		[row - 1, col],
		[row, col + 1],
		[row + 1, col],
		[row, col - 1],
	];

	for (const [r, c] of dirs) {
		if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
			if (!visited[r][c]) {
				unvisitedQueue.push(grid[r][c]);
			}
		}
	}
};
