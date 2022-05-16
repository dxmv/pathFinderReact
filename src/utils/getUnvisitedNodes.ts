import { INode } from "../types";

export const getUnvisitedNodes = (
	grid: INode[][],
	current: INode,
	unvisitedQueue: INode[],
	visited: INode[]
) => {
	const { row, col } = current;
	if (
		row - 1 >= 0 &&
		unvisitedQueue.findIndex(el => el.row === row - 1 && el.col === col) ===
			-1 &&
		visited.findIndex(el => el.row === row - 1 && el.col === col) === -1
	) {
		unvisitedQueue.push(grid[row - 1][col]);
	}
	if (
		col + 1 <= grid[0].length - 1 &&
		unvisitedQueue.findIndex(el => el.row === row && el.col === col + 1) ===
			-1 &&
		visited.findIndex(el => el.row === row && el.col === col + 1) === -1
	) {
		unvisitedQueue.push(grid[row][col + 1]);
	}
	if (
		row + 1 <= grid.length - 1 &&
		unvisitedQueue.findIndex(el => el.row === row + 1 && el.col === col) ===
			-1 &&
		visited.findIndex(el => el.row === row + 1 && el.col === col) === -1
	) {
		unvisitedQueue.push(grid[row + 1][col]);
	}
	if (
		col - 1 >= 0 &&
		unvisitedQueue.findIndex(el => el.row === row && el.col === col - 1) ===
			-1 &&
		visited.findIndex(el => el.row === row && el.col === col - 1) === -1
	) {
		unvisitedQueue.push(grid[row][col - 1]);
	}
};
