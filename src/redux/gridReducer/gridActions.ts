import { INode } from "../../types";
import { ActionType } from "./gridTypes";
const initiateGrid = (width: number, height: number): ActionType => {
	return {
		type: "INIT_GRID",
		payload: {
			width,
			height,
		},
	};
};

const newGrid = (arr: INode[][]): ActionType => {
	return {
		type: "NEW_GRID",
		payload: arr,
	};
};

const changePlace = (
	nodeType: "start" | "finish",
	row: number,
	col: number
): ActionType => {
	return {
		type: "CHANGE_POS",
		payload: {
			nodeType: nodeType,
			row: row,
			col: col,
		},
	};
};

const resetGrid = (): ActionType => {
	return {
		type: "RESET_GRID",
		payload: null,
	};
};

export default { initiateGrid, newGrid, changePlace, resetGrid };
