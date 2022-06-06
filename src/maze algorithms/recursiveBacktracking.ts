import { INode } from "../types";
import addWalls from "./addWalls";
import isVisitedSet from "./isVisitedSet";

const recursiveBacktracking = (grid: INode[][], dispatch: any) => {
	// Current node
	const current = grid[0][0];
	current.isWall = false;

	const visited: Set<string> = new Set();

	// Add walls to grid so you can remove them later
	addWalls(grid);

	makeMaze(grid, current, visited);
};

const makeMaze = (grid: INode[][], current: INode, visited: Set<string>) => {
	visited.add(current.row + " " + current.col);
	current.isWall = false;
	const neighbors = shuffleArray(getNeighbors(grid, current));
	for (let n of neighbors) {
		const { col, row } = n;
		if (!isVisitedSet(visited, row, col)) {
			if (row > current.row) {
				grid[row - 1][col].isWall = false;
			} else if (row < current.row) {
				grid[row + 1][col].isWall = false;
			} else if (col < current.col) {
				grid[row][col + 1].isWall = false;
			} else if (col > current.col) {
				grid[row][col - 1].isWall = false;
			}
			makeMaze(grid, grid[row][col], visited);
		}
	}
};

const shuffleArray = (array: INode[]): INode[] => {
	return array.sort(() => Math.random() - 0.5);
};

const getNeighbors = (grid: INode[][], current: INode): INode[] => {
	const available: INode[] = [];

	try {
		const { row, col } = current;
		if (row - 2 >= 0) {
			available.push(grid[row - 2][col]);
		}
		if (row + 2 < grid.length) {
			available.push(grid[row + 2][col]);
		}
		if (col - 2 >= 0) {
			available.push(grid[row][col - 2]);
		}
		if (col + 2 < grid[0].length) {
			available.push(grid[row][col + 2]);
		}
		return available;
	} catch (e) {
		console.log(e);
		return available;
	}
};

export default recursiveBacktracking;
