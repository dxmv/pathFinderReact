import { INode } from "../types";
import getUnvisitedNeighbors from "./getNeighbors";
import { getShortest } from "./getShortest";

const dfs = (
	grid: INode[][],
	startCoords: { row: number; col: number },
	endCoords: { row: number; col: number }
): {visited: Set<INode>, path: INode[]} => {
	const visited: Set<INode> = new Set();
	const shortestPath: Map<string, string | null> = new Map();
	findPath(
		grid[startCoords.row][startCoords.col],
		endCoords,
		visited,
		shortestPath,
		grid
	);
	return {
		visited,
		path: getShortest(
			grid,
			`${startCoords.row} ${startCoords.col}`,
			shortestPath
		).reverse(),
	};
};

const findPath = (
	current: INode,
	endCoords: { row: number; col: number },
	visited: Set<INode>,
	shortestPath: Map<string, string | null>,
	grid: INode[][]
) => {
	if (current.row === endCoords.row && current.col === endCoords.col) {
		return;
	}
	visited.add(current);
	shortestPath.set(`${current.row} ${current.col}`, null);
	if (
		current.row - 1 >= 0 &&
		!visited.has(grid[current.row - 1][current.col]) &&
		!grid[current.row - 1][current.col].isWall
	) {
		let newC = grid[current.row - 1][current.col];
		shortestPath.set(
			`${current.row} ${current.col}`,
			`${newC.row} ${newC.col}`
		);
		findPath(newC, endCoords, visited, shortestPath, grid);
	} else if (
		current.col + 1 <= grid[0].length - 1 &&
		!visited.has(grid[current.row][current.col + 1]) &&
		!grid[current.row][current.col + 1].isWall
	) {
		let newC = grid[current.row][current.col + 1];
		shortestPath.set(
			`${current.row} ${current.col}`,
			`${newC.row} ${newC.col}`
		);
		findPath(newC, endCoords, visited, shortestPath, grid);
	} else if (
		current.row + 1 <= grid.length - 1 &&
		!visited.has(grid[current.row + 1][current.col]) &&
		!grid[current.row + 1][current.col].isWall
	) {
		let newC = grid[current.row + 1][current.col];
		shortestPath.set(
			`${current.row} ${current.col}`,
			`${newC.row} ${newC.col}`
		);
		findPath(newC, endCoords, visited, shortestPath, grid);
	} else if (current.col - 1 >= 0 && !visited.has(grid[current.row][current.col - 1]) && !grid[current.row][current.col - 1].isWall) {
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
