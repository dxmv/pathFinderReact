import { INode } from "../types";
import addWalls from "./addWalls";
import isVisitedSet from "./isVisitedSet";

const prim = (grid: INode[][]) => {
	addWalls(grid);
	const visited = new Set<string>();
	const frontier = new Set<string>();
	const connectionsMap = new Map<string, string[]>();

	// Start from random cell
	let cell = grid[0][0];
	frontier.add(cell.row + " " + cell.col);

	while (frontier.size > 0) {
		// Add to visited
		visited.add(`${cell.row} ${cell.col}`);

		// Delete from frontier
		frontier.delete(`${cell.row} ${cell.col}`);

		// Get frontiers
		const arr = getFrontierCells(grid, cell, visited, connectionsMap);
		addArrayOfCellsToFrontierSet(arr, frontier);

		if (frontier.size > 0) {
			// Get random cell from frontier
			const randIndex = Math.floor(
				Math.random() * (Array.from(frontier).length - 1)
			);
			const randomCoords: string = Array.from(frontier)[randIndex];
			let [row, col] = randomCoords.split(" ").map(Number);
			cell = grid[row][col];
			cell.isWall = false;

			// Connecting with connections
			const connections = connectionsMap.get(`${cell.row} ${cell.col}`);
			if (connections) {
				connectCells(
					connections[Math.floor(Math.random() * (connections.length - 1))],
					cell,
					visited,
					grid
				);
			}
		}
	}
};

const connectCells = (
	cell: string,
	neighbor: INode,
	visited: Set<string>,
	grid: INode[][]
): void => {
	let [row, col] = cell.split(" ").map(Number);
	// Down
	if (neighbor.row > row) {
		row++;
	}
	// Up
	else if (neighbor.row < row) {
		row--;
	}
	// Left
	else if (neighbor.col < col) {
		col--;
	}
	// Right
	else if (neighbor.col > col) {
		col++;
	}
	grid[row][col].isWall = false;
	visited.add(`${row} ${col}`);
};

const getFrontierCells = (
	grid: INode[][],
	cell: INode,
	visited: Set<string>,
	map: Map<string, string[]>
): INode[] => {
	const { row, col } = cell;
	const arr: INode[] = [];
	// Up
	if (
		isValidCell(row - 2, col, grid.length, grid[0].length) &&
		!isVisitedSet(visited, row - 2, col) &&
		grid[row - 2][col].isWall
	) {
		arr.push(grid[row - 2][col]);
		const connections = map.get(`${row - 2} ${col}`);
		map.set(`${row - 2} ${col}`, [
			...(connections ? connections : []),
			`${row} ${col}`,
		]);
	}
	// Down
	if (
		isValidCell(row + 2, col, grid.length, grid[0].length) &&
		!isVisitedSet(visited, row + 2, col) &&
		grid[row + 2][col].isWall
	) {
		arr.push(grid[row + 2][col]);
		const connections = map.get(`${row + 2} ${col}`);
		map.set(`${row + 2} ${col}`, [
			...(connections ? connections : []),
			`${row} ${col}`,
		]);
	}
	// Right
	if (
		isValidCell(row, col + 2, grid.length, grid[0].length) &&
		!isVisitedSet(visited, row, col + 2) &&
		grid[row][col + 2].isWall
	) {
		arr.push(grid[row][col + 2]);
		const connections = map.get(`${row} ${col + 2}`);
		map.set(`${row} ${col + 2}`, [
			...(connections ? connections : []),
			`${row} ${col}`,
		]);
	}
	// Left
	if (
		isValidCell(row, col - 2, grid.length, grid[0].length) &&
		!isVisitedSet(visited, row, col - 2) &&
		grid[row][col - 2].isWall
	) {
		arr.push(grid[row][col - 2]);
		const connections = map.get(`${row} ${col - 2}`);
		map.set(`${row} ${col - 2}`, [
			...(connections ? connections : []),
			`${row} ${col}`,
		]);
	}
	return arr;
};

const isValidCell = (row: number, col: number, height: number, width: number) =>
	row >= 0 && row < height && col >= 0 && col < width;

const addArrayOfCellsToFrontierSet = (arr: INode[], set: Set<string>) => {
	for (let n of arr) {
		set.add(`${n.row} ${n.col}`);
	}
};

export default prim;
