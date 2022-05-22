import gridActions from "../redux/gridReducer/gridActions";
import { INode } from "../types";

const movePlayer = (
	toX: number,
	toY: number,
	prevX: number,
	prevY: number,
	grid: INode[][],
	dispatch: any,
	type: "start" | "finish"
): void => {
	if (type === "start") {
		grid[prevX][prevY].isStart = false;
		grid[toX][toY].isStart = true;
	} else {
		grid[prevX][prevY].isFinish = false;
		grid[toX][toY].isFinish = true;
	}
	dispatch(gridActions.changePlace(type, toX, toY));
	dispatch(gridActions.newGrid([...grid]));
};

const canMovePlayer = (
	toX: number,
	toY: number,
	finishX: number,
	finishY: number,
	prevX: number,
	prevY: number,
	grid: INode[][]
) => {
	// If we are trying to place the start on the start square
	if (toX === prevX && toY === prevY) {
		return false;
	}

	// If we are trying to place the start on the end square
	if (finishX === toX && finishY === toY) {
		return false;
	}

	// If we are trying to place on the wall
	if (grid[toX][toY].isWall) {
		return false;
	}

	return true;
};

export default { movePlayer, canMovePlayer };
