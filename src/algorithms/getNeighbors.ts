import { INode } from "../types";

const getNeighbors = (
	grid: INode[][],
	current: INode,
	visited: INode[]
): INode[] => {
	const arr: INode[] = [];
	const { row, col } = current;
	if (row > 0 && isVisited(visited, row - 1, col)) {
		arr.push(grid[row - 1][col]);
	}
	if (row < grid.length - 1 && isVisited(visited, row + 1, col)) {
		arr.push(grid[row + 1][col]);
	}
	if (col > 0 && isVisited(visited, row, col - 1)) {
		arr.push(grid[row][col - 1]);
	}
	if (col < grid[0].length - 1 && isVisited(visited, row, col + 1)) {
		arr.push(grid[row][col + 1]);
	}
	return arr;
};

export const isVisited = (
	visited: INode[],
	row: number,
	col: number
): boolean => {
	return visited.findIndex(el => el.row === row && el.col === col) === -1;
};

export default getNeighbors;
