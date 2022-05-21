import { INode } from "../types";
import { isVisited, isWall } from "./getNeighbors";
import { getShortest } from "./getShortest";

const dfs = (
	grid: INode[][],
	startCoords: { row: number; col: number },
	endCoords: { row: number; col: number }
): [INode[], INode[]] => {
	const visited: INode[] = [];
	const shortestPath: Map<string, string | null> = new Map();
	findPath(
		grid[startCoords.row][startCoords.col],
		endCoords,
		visited,
		shortestPath,
		grid
	);
	return [
		visited,
		getShortest(
			grid,
			`${startCoords.row} ${startCoords.col}`,
			shortestPath
		).reverse(),
	];
};

const findPath = (
	current: INode,
	endCoords: { row: number; col: number },
	visited: INode[],
	shortestPath: Map<string, string | null>,
	grid: INode[][]
) => {
	if (current.row === endCoords.row && current.col === endCoords.col) {
		return;
	}
	visited.push(current);
	shortestPath.set(`${current.row} ${current.col}`, null);
	if (
		current.row - 1 >= 0 &&
		isVisited(visited, current.row - 1, current.col) &&
		!isWall(grid, current.row - 1, current.col)
	) {
		let newC = grid[current.row - 1][current.col];
		shortestPath.set(
			`${current.row} ${current.col}`,
			`${newC.row} ${newC.col}`
		);
		findPath(newC, endCoords, visited, shortestPath, grid);
	} else if (
		current.col + 1 <= grid[0].length - 1 &&
		isVisited(visited, current.row, current.col + 1) &&
		!isWall(grid, current.row, current.col + 1)
	) {
		let newC = grid[current.row][current.col + 1];
		shortestPath.set(
			`${current.row} ${current.col}`,
			`${newC.row} ${newC.col}`
		);
		findPath(newC, endCoords, visited, shortestPath, grid);
	} else if (
		current.row + 1 <= grid.length - 1 &&
		isVisited(visited, current.row + 1, current.col) &&
		!isWall(grid, current.row + 1, current.col)
	) {
		let newC = grid[current.row + 1][current.col];
		shortestPath.set(
			`${current.row} ${current.col}`,
			`${newC.row} ${newC.col}`
		);
		findPath(newC, endCoords, visited, shortestPath, grid);
	} else if (current.col - 1 >= 0) {
		let newC = grid[current.row][current.col - 1];
		shortestPath.set(
			`${current.row} ${current.col}`,
			`${newC.row} ${newC.col}`
		);
		findPath(newC, endCoords, visited, shortestPath, grid);
	}
	return;
};

export default dfs;
