import gridActions from "../redux/gridReducer/gridActions";
import { INode } from "../types";
import addClass from "./addClass";

export const visualizeVisitedNodes = async (
	grid: INode[][],
	visitedNodes: Set<INode>,
	shortestPath: INode[],
	speed: number,
	dispatch: any
) => {
	let i = 0;
	visitedNodes.forEach((node) => {
		if (i === visitedNodes.size - 1) {
			setTimeout(() => {
				visualizeShortestPath(grid, shortestPath, speed, dispatch);
			}, speed * i);
		}
		setTimeout(() => {
			addClass(`${node.row} ${node.col}`, "checked");
		}, speed * i);
		i++;
	});
};

export const visualizeShortestPath = (
	grid: INode[][],
	shortestPath: INode[],
	speed: number,
	dispatch: any
) => {
	for (let j = 0; j < shortestPath.length; j++) {
		if (j === shortestPath.length - 1) {
			setTimeout(() => {
				animatePlayer(grid, shortestPath, speed, dispatch);
			}, speed * 5 * j);
		}
		setTimeout(() => {
			addClass(`${shortestPath[j].row} ${shortestPath[j].col}`, "path");
		}, speed * 5 * j);
	}
};

const animatePlayer = (
	grid: INode[][],
	shortestPath: INode[],
	speed: number,
	dispatch: any
) => {
	for (let j = 0; j < shortestPath.length; j++) {
		setTimeout(() => {
			document
				.getElementById(`${shortestPath[j].row} ${shortestPath[j].col}`)
				?.classList.remove("path");
			document
				.getElementById(`${shortestPath[j].row} ${shortestPath[j].col}`)
				?.classList.remove("checked");
			grid[shortestPath[j].row][shortestPath[j].col].isStart = true;
			dispatch(gridActions.newGrid(grid));
		}, speed * 20 * j);
	}
};
