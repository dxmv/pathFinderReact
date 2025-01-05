import { INode } from "../types";
import getUnvisitedNeighbors from "./getNeighbors";
import { getShortest } from "./getShortest";
import { PriorityQueue } from '../utils/PriorityQueue';

const dijkstra = async (
	startCoords: { x: number; y: number },
	endCoords: { x: number; y: number },
	arr: INode[][],
): Promise<{visited: Set<INode>, path: INode[]}> => {
	const grid: INode[][] = [...arr];
	const visited: Set<INode> = new Set();
	const openSet: Set<INode> = new Set();
	const distances = new Map<string, number>();
	const parents = new Map<string, string>();

	// Add start node to open set
	const startNode = grid[startCoords.x][startCoords.y];
	openSet.add(startNode);
	
	const startKey = `${startCoords.x},${startCoords.y}`;
	distances.set(startKey, 0);

	while (openSet.size > 0) {
		let current: INode | null = null;
		let minDistance = Infinity;

		// Find node with lowest distance
		for (const node of Array.from(openSet)) {
			const key = `${node.row},${node.col}`;
			const distance = distances.get(key) || Infinity;
			if (distance < minDistance) {
				minDistance = distance;
				current = node;
			}
		}

		if (!current) break;

		if (current.isFinish) {
			visited.add(current);
			break;
		}

		openSet.delete(current);
		visited.add(current);
		current.isChecked = true;

		const neighbors = getUnvisitedNeighbors(grid, current, visited);
		const currentKey = `${current.row},${current.col}`;
		const currentDist = distances.get(currentKey) || 0;

		for (const neighbor of neighbors) {
			if (neighbor.isWall) continue;

			const neighborKey = `${neighbor.row},${neighbor.col}`;
			const newDist = currentDist + 1;

			if (newDist < (distances.get(neighborKey) || Infinity)) {
				distances.set(neighborKey, newDist);
				parents.set(neighborKey, currentKey);
				
				if (!openSet.has(neighbor)) {
					openSet.add(neighbor);
				}
			}
		}
	}

	const path: INode[] = [];
	let currentKey = `${endCoords.x},${endCoords.y}`;
	
	while (currentKey && parents.has(currentKey)) {
		const [row, col] = currentKey.split(',').map(Number);
		path.unshift(grid[row][col]);
		currentKey = parents.get(currentKey)!;
	}

	path.unshift(grid[startCoords.x][startCoords.y]);

	return { visited, path };
};

export default dijkstra;
