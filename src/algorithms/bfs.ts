import { INode } from "../types";
import getUnvisitedNeighbors from "./getNeighbors";


const bfs = (grid: INode[][], startRow: number, startCol: number): {visited: Set<INode>, path: INode[]} => {
	// Initialize with start node
	const startNode = grid[startRow][startCol];
	
	// BFS uses a queue - first in, first out
	// This ensures we explore nodes in order of their distance from start
	const queue: INode[] = [startNode];
	const visited: Set<INode> = new Set([startNode]);
	const predecessors: Map<INode, INode | null> = new Map([[startNode, null]]);

	while (queue.length > 0) {
		const current = queue.shift();
		if (!current) continue;

		// When we find the finish node, we've found the shortest path
		// because BFS explores nodes in order of their distance from start
		if (current.isFinish) {
			const shortestPath: INode[] = [];
			let node: INode | null = current;
			
			// Reconstruct the shortest path by backtracking through predecessors
			while (node) {
				shortestPath.unshift(node);
				node = predecessors.get(node) || null;
			}
			return { visited, path: shortestPath };
		}

		// Explore all neighbors at the current distance level
		// before moving to nodes that are farther away
		const neighbors = getUnvisitedNeighbors(grid, current, visited);
		for (const neighbor of neighbors) {
			queue.push(neighbor);
			visited.add(neighbor);
			predecessors.set(neighbor, current);
		}
	}

	return { visited, path: [] };
};

export default bfs;
