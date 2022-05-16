import { INode } from "../types";
import getNeighbors, { isVisited } from "./getNeighbors";
import { getShortest } from "./getShortest";

const dijkstra = async (
	startCoords: { x: number; y: number },
	endCoords: { x: number; y: number },
	arr: INode[][]
): Promise<[INode[], INode[]]> => {
	const grid: INode[][] = [...arr];

	// Map for distances
	const map = initMap(grid, startCoords);

	// Parents to get the shortest path to end
	const parents = initParents(grid, startCoords);

	// Current node is start
	let current: INode | undefined = grid[startCoords.x][startCoords.y];

	const visited: INode[] = [];
	while (current && !current.isFinish) {
		// Checking this node as visited
		visited.push(current);

		// Checking neighbors and changing their distance
		const neighbors = getNeighbors(grid, current, visited);
		if (neighbors.length > 0) {
			updateNeighbors(neighbors, current, map, parents);
		}

		current.isChecked = true;

		// Going to the next closest node
		let { i, j } = getSmallestNode(map, visited);
		current = grid[i][j];
	}
	// Getting the shortest path
	let currentPath = parents.get(`${endCoords.x} ${endCoords.y}`);

	return [visited, getShortest(grid, currentPath, parents)];
};

// Initializing the map
const initMap = (
	grid: INode[][],
	startCoords: { x: number; y: number }
): Map<string, number> => {
	const map = new Map<string, number>();
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (i === startCoords.x && j === startCoords.y) {
				map.set(`${i} ${j}`, 0);
			} else {
				map.set(`${i} ${j}`, Infinity);
			}
		}
	}
	return map;
};

// Initiate parents into a map
const initParents = (
	grid: INode[][],
	startCoords: { x: number; y: number }
): Map<string, string | null> => {
	const map = new Map<string, string | null>();
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (i === startCoords.x && j === startCoords.y) {
				map.set(`${i} ${j}`, "start");
			} else {
				map.set(`${i} ${j}`, null);
			}
		}
	}
	return map;
};

const getSmallestNode = (
	map: Map<string, number>,
	visited: INode[]
): { i: number; j: number } => {
	let min = Infinity,
		minKey = "";
	map.forEach((item, key) => {
		const [i, j] = key.split(" ");
		if (item < min && isVisited(visited, Number(i), Number(j))) {
			min = item;
			minKey = key;
		}
	});
	const [row, col] = minKey.split(" ");
	return { i: Number(row), j: Number(col) };
};

const updateNeighbors = (
	neighbors: INode[],
	current: INode,
	map: Map<string, number>,
	parents: Map<string, string | null>
) => {
	for (let n of neighbors) {
		const newCost = Number(map.get(`${current.row} ${current.col}`)) + 1;
		const oldCost = Number(map.get(`${n.row} ${n.col}`));
		if (newCost < oldCost) {
			map.set(`${n.row} ${n.col}`, newCost);
			parents.set(`${n.row} ${n.col}`, `${current.row} ${current.col}`);
		}
	}
};

export default dijkstra;
