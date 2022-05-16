import gridActions from "../redux/gridReducer/gridActions";
import { INode } from "../types";
import addClass from "./addClass";

export const visualizeVisitedNodes = async (
	visitedNodes: INode[],
	shortestPath: INode[],
	speed: number,
	dispatch: any
) => {
	for (let i = 0; i < visitedNodes.length; i++) {
		if (i === visitedNodes.length - 1) {
			setTimeout(() => {
				visualizeShortestPath(shortestPath, speed, dispatch);
			}, speed * i);
		}
		setTimeout(() => {
			addClass(`${visitedNodes[i].row} ${visitedNodes[i].col}`, "checked");
		}, speed * i);
	}
};

export const visualizeShortestPath = (
	shortestPath: INode[],
	speed: number,
	dispatch: any
) => {
	for (let j = 0; j < shortestPath.length; j++) {
		setTimeout(() => {
			addClass(`${shortestPath[j].row} ${shortestPath[j].col}`, "path");
			// dispatch(
			// 	gridActions.changePlace(
			// 		"start",
			// 		shortestPath[j].row,
			// 		shortestPath[j].col
			// 	)
			// );
		}, speed * 5 * j);
	}
};
