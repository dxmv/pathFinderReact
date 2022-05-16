import { INode } from "../../types";
export interface IGridState {
	board: INode[][];
	startCoords: { startCol: number; startRow: number };
	endCoords: { endCol: number; endRow: number };
}

export type ActionType = INewGrid | InitGrid | IChangePosition | IResetGrid;

export interface INewGrid {
	type: "NEW_GRID";
	payload: INode[][];
}

export interface InitGrid {
	type: "INIT_GRID";
	payload: {
		width: number;
		height: number;
	};
}

export interface IResetGrid {
	type: "RESET_GRID";
	payload: null;
}

export interface IChangePosition {
	type: "CHANGE_POS";
	payload: {
		nodeType: "start" | "finish";
		row: number;
		col: number;
	};
}
