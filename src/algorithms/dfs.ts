import { INode } from "../types";
import getUnvisitedNeighbors from "./getNeighbors";

const dfs = (
	grid: INode[][],
	startCoords: { row: number; col: number },
	endCoords: { row: number; col: number }
): {visited: Set<INode>, path: INode[]} => {
	const visited: Set<INode> = new Set();
	const startNode = grid[startCoords.row][startCoords.col];
	
	const traverse = (current: INode): boolean => {
		visited.add(current);
		current.isChecked = true;

		if (current.row === endCoords.row && current.col === endCoords.col) {
			return true;
		}

		const neighbors = getUnvisitedNeighbors(grid, current, visited);
		for (const neighbor of neighbors) {
			if (traverse(neighbor)) {
				return true;
			}
		}
		return false;
	};

	traverse(startNode);
	return { visited, path: [] };
};

export default dfs;
