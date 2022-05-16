import { INode } from "../types";

import getNeighbors from "./getNeighbors";

const bfs = (grid: INode[][], startRow: number, startCol: number): INode[] => {
	let current: INode | undefined = grid[startRow][startCol];

	// Queue of unvisited nodes
	const unvisitedQueue: INode[] = [];

	// Visited nodes
	const visited: INode[] = [];
	while (current) {
		if (current.isFinish) {
			break;
		}
		getUnvisitedNodes(grid, current, unvisitedQueue, visited);
		visited.push(current);

		// Get the next node in the queue
		current = unvisitedQueue.shift();
	}

	return visited;
};

// Get All unvisited nodes for current node
// Add them to the queue
const getUnvisitedNodes = (
	grid: INode[][],
	current: INode,
	unvisitedQueue: INode[],
	visited: INode[]
) => {
	const arr = getNeighbors(grid, current, visited);
	arr.forEach(e => {
		if (
			unvisitedQueue.findIndex(el => el.row === e.row && el.col === e.col) ===
			-1
		)
			unvisitedQueue.push(e);
	});
};

export default bfs;
